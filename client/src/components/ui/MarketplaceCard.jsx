import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import Link from "next/link";

export function MarketplaceCard({ details }) {
    const { id, title, description, category, startDate, src, item, price } = details;
    return (
        <Card className="w-full z-0 bg-[#F5F7FB] shadow-none">
            <CardHeader shadow={false} floated={false} className="h-52 bg-[#F5F7FB]">
                <img
                    src={src}
                    alt="card-image"
                    className="h-full w-full object-cover rounded p-1"
                />
            </CardHeader>
            <CardBody className="p-2 sm:p-2 sm:pl-4 pb-0 bg-[#F5F7FB]">
                <div className="mb-2 flex justify-between">
                    <div className="flex flex-col">
                        <Typography color="blue-gray" className="font-semibold">
                            {title}
                        </Typography>

                        <Typography
                            variant="small"
                            color="gray"
                            className="font-normal opacity-75"
                        >{startDate}
                        </Typography>

                        <Typography
                            variant="small"
                            color="gray"
                            className="font-normal opacity-75"
                        >{item}
                        </Typography>
                        <Typography
                            variant="small"
                            color="gray"
                            className="font-normal opacity-75"
                        >{category}
                        </Typography>
                    </div>
                    <div className="flex flex-col justify-end text-right ml-1">
                        <Link href={`/marketplace/${id}`}>
                            <Button
                                ripple={false}
                                fullWidth={false}
                                className="bg-[#FAD749] px-4 py-1 rounded shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            >Buy
                            </Button>
                        </Link>
                        <Typography variant="small"
                            color="gray"
                            className="font-normal opacity-75 mt-3">${price}/ticket</Typography>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}