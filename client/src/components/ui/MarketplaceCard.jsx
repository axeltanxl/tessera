import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

export function MarketplaceCard({ details }) {
    const { id, title, description, category, startDate, src, item, price } = details;
    return (
        <Card className="w-full rounded z-0 bg-[#F5F7FB]">
            <CardHeader shadow={false} floated={false} className="h-52 bg-[#F5F7FB]">
                <img
                    src={src}
                    alt="card-image"
                    className="h-full w-full object-cover rounded p-2"
                />
            </CardHeader>
            <CardBody className="p-2 sm:p-2 sm:pl-4 pb-0 bg-[#F5F7FB]">
                <div className="mb-2 flex items-center justify-between">
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
                    </div>
                    <div className="flex flex-col">
                        <Button
                            ripple={false}
                            fullWidth={false}
                            className="bg-[#FAD749] px-4 py-1 rounded shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                        >Buy
                        </Button>
                        <Typography variant="small"
                            color="gray"
                            className="font-normal opacity-75 mt-3">${price}/ticket</Typography>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}