import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export function EventCard({details}) {
    const {id, title, description, category, startDate, src} = details;
    return (
      <Card className="w-full rounded z-0">
        <CardHeader shadow={false} floated={false} className="h-52">
          <img
            src={src}
            alt="card-image"
            className="h-full w-full object-cover rounded"
          />
        </CardHeader>
        <CardBody className="p-2 sm:p-6 pb-o">
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-semibold">
              {title}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              $95.00
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >{category}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex justify-center">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-[#F5F7FB] px-4 py-1 rounded shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    );
  }