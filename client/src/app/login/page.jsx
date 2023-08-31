import LoginForm from "@/components/pages/login/LoginForm";
import CreateCanvas from "@/components/canvas/CreateCanvas";
const Page = () => {
    return (
    <div className="w-full flex flex-col justify-center items-center">
        <div className="w-2/5 z-10">
            <LoginForm/>
        </div>
        <div className="-z-10 w-[1100px] h-[1200px] absolute pt-10" >
            <CreateCanvas urlToGLTF={"./stadium/scene.gltf"} scale={0.016} rotation={[0,-1,0]} position={[0,-1.4, 0]} />
        </div>
    </div>)
}
export default Page;
