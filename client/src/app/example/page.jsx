import { Button } from "@/components/ui/button";
import Link from "next/link";
<<<<<<< HEAD
import { loadStripe } from '@stripe/stripe-js';

=======
import CreateCanvas from "@/components/canvas/CreateCanvas";
>>>>>>> 7171e1e72b5083549dad536e381bec792d9b080c
async function getData() {
    // You would usually fetch data from an API here.
    // const res = await fetch("https://api.github.com/");
  
    // But, here we just wait for 3 seconds.
    await new Promise((res) => setTimeout(res, 3000));
  
    // You would usually return data from an API here.
    // return res.json();
    return "Dashboard data";
  }

  const storeItems = [
    {
        id : 1,
        title : "item 1",
        price : 0.01
    },
    {
        id : 2,
        title : "item 2",
        price : 0.01
    }
]

  const createSession = async(req, res) => {
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types : ['card'],
            mode : "payment",
            line_items: req.body.items.map(item => {
                const storeItem  = storeItems.get(item.id)
                return {
                    price_data : {
                        currency : 'usd',
                        product_data : {
                            name : storeItem.name
                        },
                        unit_amount : storeItem.price
                    },
                    quantity : item.quantity
                }
            }),
            success_url : "http://localhost:3000/checkout/success",
            cancel_url : "http://localhost:3000/checkout/cancel",
        })
      } catch (error) {
        
      }
  }
  
  export default async function Page() {
    const name = await getData();

    return (
        <div>
            <Button aschild variant="outline" className="m-4 bg-example hover:bg-example text-black pointer-events:none">
            <Link href="/">Help</Link>
            </Button>
            <div className="w-[150px] h-[150px]" >
                    <CreateCanvas urlToGLTF={"./desktop_pc/scene.gltf"} scale={0.3} rotation={[0,-1,0]} position={[0,-1, 0]}/>
            </div>
            <p>🤩 Hello {name}!</p>

            <Button variant="outlined">checkout</Button>
        </div>
    )
  }