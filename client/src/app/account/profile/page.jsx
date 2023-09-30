import { Separator } from "@/components/ui/separator"
import SignUpForm from "@/components/pages/signup/SignUpForm"
import SideNav from "@/components/ui/accountNav/SideNav"
import AccDet from "@/components/pages/account/AccDet"
import { fetchDetails, updateDetails } from "./actions"
import AccPw from "@/components/pages/account/AccPw"
import {  updatePw } from "@/app/account/profile/actions"

// import { axiosSpring } from "@/lib/utils"

// const action = async (data, userId) => {
//     const res = axiosSpring.put(`users/update/${userId}`,data)
//     console.log(res)
// }   

const Profile = async () => {
    const jsonDetails = await fetchDetails()
    const details = JSON.stringify(jsonDetails);
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
                    <div className="w-full bg-primary p-8 flex justify-around rounded-b-lg">
                        {/* <SignUpForm actionName={"Update Profile"} fillDetails action={action}/> */}
                        <div className="w-2/5 flex">
                            <AccDet details={details} />
                        </div>
                        <div className="w-2/5 flex">
                            <AccPw userId={jsonDetails.userID} updatePw={updatePw}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
export default Profile;
