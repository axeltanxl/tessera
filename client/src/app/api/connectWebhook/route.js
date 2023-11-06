import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import CryptoJS from 'crypto-js'

export async function POST(request, response){
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');
    let event;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const prisma = new PrismaClient();

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET);
        console.log(event);
      } 
    catch (err) {
        console.log("error occurred?")
        return NextResponse.json({message : `Webhook Error: ${err.message}`}, {status : 400});
      }
      
      switch (event.type) {
        case 'payment_intent.succeeded':
        case 'charge.succeeded':
          const paymentIntentSucceeded = event.data.object;
          const {id} = paymentIntentSucceeded
          
          try {
              const paymentIntent =  await stripe.paymentIntents.retrieve(id);
              const { paymentReason } = paymentIntent.metadata;
              if(paymentReason === "purchase"){
                    const { userID, seats, orderId, paymentMethod, runSeats } = paymentIntent.metadata;
                    const seatIDs = JSON.parse(seats);
                    const runseats = JSON.parse(runSeats);
                    console.table(paymentIntent.metadata);
                    createPaymentForPurchase(prisma,id, userID, seatIDs, orderId, paymentMethod, runseats)
                }else if(paymentReason === "transaction"){
                    const {listingID, buyerID, seatIDs, paymentMethod} = paymentIntent.metadata;
                    console.table(paymentIntent.metadata);
                    payUser(prisma, id, listingID, buyerID, paymentMethod, seatIDs);
                }
                return NextResponse.json({message : "success yayy"}, {status : 200});
          } catch (error) {
            // console.log("error",error)
            return NextResponse.json({message : "no order created "}, {status : 400});
          }

        //this case means checkout not completed yet expired and was not captured by sending them to fail link
        case 'checkout.session.expired':
            const expiredSession = event.data.object;
            console.log(expiredSession)
            const { payment_status, metadata} = expiredSession
            console.log(payment_status, metadata);
            if (session.payment_status === "unpaid"){
                const runSeats = JSON.parse(metadata.runSeats);
                for(let seat of runSeats){
                    const { isAvailable } = await prisma.runseat.findUnique({
                        where : {
                            runSeatID : seat,
                        },
                        select : {
                            isAvailable : true,
                        }
                    })
                    if(isAvailable === 2){
                        await prisma.runseat.update({
                            where : {
                                runSeatID : seat,
                            },
                            data : {
                                isAvailable : 1,
                            }
                        }) 
                    }
                }
            }
            return NextResponse.json({message : "unreserve seat"}, {status : 200});

        // case 'payment_intent.payment_failed':
        // case 'charge.charge.failed':
        //     console.log(event.data.object)
        //     const paymentIntentFailed = event.data.object;
        //     console.log(paymentIntentFailed)
        //     return NextResponse.json({message : "captured payment failed"}, {status : 200});
        //     console.log("failed failed failed")
        //     return NextResponse.json({message : "seat unreserved"}, {status : 200});

        default:
          console.log(`Unhandled event type ${event.type}`);
          return NextResponse.json({message : `Unhandled event type ${event.type}`}, {status : 400});
      }
}






const createPaymentForPurchase = async (prisma,id, userID, seatIDs, orderId, paymentMethod, runSeats) => {
    // create payment success
    console.log(runSeats);
    await prisma.payment.create({
        data: {
            paymentMethod : paymentMethod,
            orderID : orderId,
            transactionID : null,
            stripePaymentID : id,
          },
      })

    const {runID} =  await prisma.custorder.findUnique({
        where : {
            orderID : orderId,
        },
        select : {
            runID : true,
        }
    })

        //added to qrcode
    const {name : userName} = await prisma.user.findUnique({
        where : {
            userID : userID,
        },
        select : {
            name : true,
        }
    })
        //added to qrcode
    const { eventID } = await prisma.run.findUnique({
        where : {
            runID : runID,
        },
        select : {
            eventID : true,
        }
    })

    //added to qrcode
    const {name : eventName } = await prisma.event.findUnique({
        where : {
            eventID : eventID
        },
        select : {
            name : true,
        }
    })

    for(let runSeat of runSeats){
        console.log("runseat", runSeat);
        await prisma.runseat.update({
            where : {
                runSeatID : runSeat,
            },
            data : {
                isAvailable : 0,
            }
        }) 
    }

    // create ticket for each seat
    for (let seat of seatIDs){
            //added to qrcode
        const {seatNo} = await prisma.seat.findUnique({
            where : {
                seatID : seat,
            },
            select : {
                seatNo : true,
            }
        })

        const uniqueJson = {
            userID : userID,
            runID : runID,
            seatID : seat,
            userName : userName,
            eventName : eventName,
            seatNo : seatNo
        }
        const ticketUniqueCode = CryptoJS.AES.encrypt(
            JSON.stringify(uniqueJson , (key, value) => {return typeof value === 'bigint' ? value.toString() : value;}),
            process.env.QR_SECRET_KEY1)
            .toString();

        await prisma.ticket.create({
            data : {
                orderID : orderId,
                seatID : seat,
                userID : userID,
                uniqueCode : ticketUniqueCode,
            },
        })
    }
}






const payUser = async (prisma, id, listingID, buyerID, paymentMethod, seatID) => {
    // find seller from listing
    console.log("why")
    const { userID : sellerId, ticketID, price, marketplaceID} = await prisma.ticketlisting.findUnique({
        where : {
            listingID : listingID,
        },
        select : {
            userID : true,
            ticketID : true,
            price : true,
            marketplaceID : true,
            // quantity : true,
        }
    })
    
    console.log("seller:", sellerId)
    console.log("ticket", ticketID)
    console.log("price",price)
    console.log("marketplaceID",marketplaceID);
    
        //added to qrcode
    const {runID, eventID} = await prisma.run.findUnique({
        where : {
            marketplaceID : marketplaceID,
        },
        select : {
            runID : true,
            eventID : true,
        }
    })

        //added to qrcode
    const {name : userName} = await prisma.user.findUnique({
        where : {
            userID : buyerID,
        },
        select : {
            name : true,
        }
    })

        //added to qrcode
    const {name : eventName } = await prisma.event.findUnique({
        where : {
            eventID : eventID
        },
        select : {
            name : true,
        }
    })

    // create transaction
    const { transactionID } = await prisma.transaction.create({
        data : {
            date : new Date().toISOString(),
            buyerID : buyerID,
            sellerID : sellerId,
            ticketID : ticketID
        }
    })

    // create payment
    const { paymentID } = await prisma.payment.create({
        data : {
            paymentMethod : paymentMethod,
            orderID : null,
            transactionID : transactionID,
            stripePaymentID : id,
        }
    })

    // find user bank account
    const { stripeUserID } = await prisma.user.findUnique({
        where : {
            userID : sellerId,
        },
        select : {
            stripeUserID : true,
        },
    })

    //added to qrcode
    const {seatNo} = await prisma.seat.findUnique({
        where : {
            seatID : seat,
        },
        select : {
            seatNo : true,
        }
    })

    const uniqueJson = {
        userID : buyerID,
        runID : runID,
        seatID : seatID,
        userName : userName,
        eventName : eventName,
    }
    
    // transfer of tickets
    const ticketUniqueCode = CryptoJS.AES.encrypt(
        JSON.stringify(uniqueJson , (key, value) => {return typeof value === 'bigint' ? value.toString() : value;}),
        process.env.QR_SECRET_KEY1)
        .toString();



    // update ticket to new user
    await prisma.ticket.update({
        where : {
            ticketID : ticketID,
        },
        data : {
            userID : buyerID,
            uniqueCode : ticketUniqueCode,
        }
    })

    // update status of ticketlisting since it is now sold
    await prisma.ticketlisting.update({
        where : {
            listingID : listingID,
        },
        data : {
            transactionID : transactionID,
            status : "Sold",
        }
    })

    // initiate payout
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
        const balance = await stripe.balance.retrieve();

        const {amount} = balance.available[0];
        console.log("amount", amount)

        if(price > amount){
            return NextResponse.json({"message" : "error insufficient balance"}, { 
                status: 400, 
            })
        }
        // Create a payout
        console.log(price, stripeUserID)
        const transfer = await stripe.transfers.create({
            amount: price ,
            currency: "SGD",
            destination: stripeUserID,
          });
          console.log(transfer)
}