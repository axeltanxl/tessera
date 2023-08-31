import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateCanvas from "@/components/canvas/CreateCanvas";
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
  
    return (
        <div>
            <Button aschild variant="outline" className="m-4 bg-example hover:bg-example text-black pointer-events:none">
            <Link href="/">Help</Link>
            </Button>
            <div className="w-[150px] h-[150px]" >
                    <CreateCanvas urlToGLTF={"./desktop_pc/scene.gltf"} scale={0.3} rotation={[0,-1,0]} position={[0,-1, 0]}/>
            </div>
            <p>🤩 Hello {name}!</p>
        </div>
    )
  }