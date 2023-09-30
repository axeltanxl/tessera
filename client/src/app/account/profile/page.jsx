import { Separator } from "@/components/ui/separator"
import SignUpForm from "@/components/pages/signup/SignUpForm"
import SideNav from "@/components/ui/accountNav/SideNav"
import AccDet from "@/components/pages/account/AccDet"
import { fetchDetails } from "./actions"
// import { axiosSpring } from "@/lib/utils"

// const action = async (data, userId) => {
//     const res = axiosSpring.put(`users/update/${userId}`,data)
//     console.log(res)
// }   

const Profile = async () => {
    const details = JSON.stringify(await fetchDetails());
    return (
        <section className='flex mt-10'>
            <div className='mr-20 ml-10'>
                <SideNav activeTab={3} />
            </div>
            <div className="flex flex-1 flex-col space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Profile</h3>
                    <p className="text-sm text-muted-foreground">
                        Update details about your profile here
                    </p>
                </div>
                <Separator />
                <div className="w-full flex flex-col">
                    <div className="w-3/5 bg-primary p-8 flex flex-col items-center rounded-b-lg">
                        {/* <SignUpForm actionName={"Update Profile"} fillDetails action={action}/> */}
                        <AccDet details={details}/>
                    </div>
                </div>
            </div>
        </section>

    )
}
export default Profile;
