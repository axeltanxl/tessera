import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export function EventCard({details}) {
    const {id, title, description, category, startDate, endDate, src} = details;
    return (
      <Card className="w-full rounded z-0 bg-[#F5F7FB]">
        <CardHeader shadow={false} floated={false} className="h-52 bg-[#F5F7FB]">
          <img
            src={src}
            alt="card-image"
            className="h-full w-full object-cover rounded p-2"
          />
        </CardHeader>
        <CardBody className="p-2 sm:p-2 pl-4 pb-0 bg-[#F5F7FB]">
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-semibold">
              {title}
            </Typography>
            {/* <Typography color="blue-gray" className="font-medium">
              $95.00
            </Typography>  */}
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >{startDate} to {endDate}
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >{category}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex justify-center bg-[#F5F7FB] pb-2">
          <Button
            ripple={false}
            fullWidth={false}
            className="bg-slate-200 w-[50%] px-4 py-1 rounded shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            View event
          </Button>
        </CardFooter>
      </Card>
    );
  }