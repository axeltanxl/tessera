import { Separator } from "@/components/ui/separator"
import SignUpForm from "@/components/pages/signup/SignUpForm"
import SideNav from "@/components/ui/accountNav/SideNav"
import AccDet from "@/components/pages/account/AccDet"
import { fetchDetails, updateDetails } from "./actions"
import AccPw from "@/components/pages/account/AccPw"
import { updatePw } from "@/app/account/profile/actions"
import { ViewStripeAcc } from "@/components/pages/account/ViewStripeAcc"


//onclick button go to stripe account if avail, if dont have will be 400,
// you can 1st check whether there is a link present in returned user object 
// to hide the button if the account does not exist 


const Profile = async () => {
    const jsonDetails = await fetchDetails()
    const details = JSON.stringify(jsonDetails);
    const { stripeUserID } = jsonDetails;
    console.log(stripeUserID);
    return (
        <section className='flex mt-10'>
            <div className='mr-20 ml-10'>
                <SideNav activeTab={4} />
            </div>
            <div className="flex flex-1 flex-col space-y-6">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <h3 className="text-lg font-medium">Profile</h3>
                        <p className="text-sm text-muted-foreground">
                            Update details about your profile here
                        </p>
                    </div>
                    {stripeUserID && <ViewStripeAcc />}
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
