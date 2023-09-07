import Image from "next/image";
import { Button } from "@/components/ui/button";

const CancelPage = () => {
    return <div className="w-full flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col justify-center items-center gap-4 drop-shadow-xl p-12">
            <div className="flex flex-col justify-center items-center gap-2">
                <Image width={200} height={200} src="/images/error.svg"/>
                <p className="text-4xl">Purchase Cancelled</p>
            </div>
            <div className="flex gap-4">
                <Button variant="outlined"  className="text-primary bg-secondary ">
                    Return to Home
                </Button>

                <Button variant="outlined"  className="text-primary bg-secondary ">
                    View Purchase History
                </Button>
            </div>
        </div>
    </div>
}

export default CancelPage;