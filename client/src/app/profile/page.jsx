'use client'
import { Separator } from "@/components/ui/separator"
import SignUpForm from "@/components/pages/signup/SignUpForm"
const Profile = () => {
    return (
        <div className="flex flex-col space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    Modify details about your profile here
                </p>
            </div>
        <Separator />
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-3/5 bg-primary p-8 flex flex-col items-center rounded-b-lg">
                <SignUpForm actionName={"Update Profile"}/>
            </div>
        </div>
      </div>
    )
}
export default Profile;
