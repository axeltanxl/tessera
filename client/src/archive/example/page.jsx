// "use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { loadStripe } from '@stripe/stripe-js';
import { useSession, signOut, signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
async function getData() {
    // You would usually fetch data from an API here.
    // const res = await fetch("https://api.github.com/");
  
    // But, here we just wait for 3 seconds.
    await new Promise((res) => setTimeout(res, 3000));
  
    // You would usually return data from an API here.
    // return res.json();
    return "Dashboard data";
  }


  
  export default async function Page() {
    const name = await getData();
    const session = await getServerSession(authOptions);
    // console.log("session:", session)
    // const session = useSession()
    if(session){
        return (
            <>
                {session?.user.name}
                {/* <button onClick={() => signOut()}>sign out</button> */}
            </>
        )
    }

    return (
        <div>
            <Button variant="outline" className="m-4 bg-example hover:bg-example text-black pointer-events:none">
            <Link href="/">Help</Link>
            </Button>

            <p>🤩 Hello {name}!</p>

            <Button variant="outlined">checkout</Button>

            {/* <button onClick={() => signIn("credentials", {email:"admin!@gmail.com", password:"Admin123!"})}> sign in</button> */}
        </div>
    )
  }


//   const storeItems = [
//     {
//         id : 1,
//         title : "item 1",
//         price : 0.01
//     },
//     {
//         id : 2,
//         title : "item 2",
//         price : 0.01
//     }
// ]

//   const createSession = async(req, res) => {
//       const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
//       try {
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types : ['card'],
//             mode : "payment",
//             line_items: req.body.items.map(item => {
//                 const storeItem  = storeItems.get(item.id)
//                 return {
//                     price_data : {
//                         currency : 'usd',
//                         product_data : {
//                             name : storeItem.name
//                         },
//                         unit_amount : storeItem.price
//                     },
//                     quantity : item.quantity
//                 }
//             }),
//             success_url : "http://localhost:3000/checkout/success",
//             cancel_url : "http://localhost:3000/checkout/cancel",
//         })
//       } catch (error) {
        
//       }
//   }