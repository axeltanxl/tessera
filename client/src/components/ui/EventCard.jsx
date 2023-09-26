'use client';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";

export function EventCard({ details }) {
  const { eventID, category, description, duration, endDate, maxSlots, name, pricePerCategory, startDate, venueID } = details;
  return (
    <Card className="w-full z-0 bg-[#F5F7FB] shadow-none hover:cursor-pointer hover:mix-blend-multiply">
      <CardHeader shadow={false} floated={false} className="h-52 bg-[#F5F7FB]">
        <img
          src={'./image-9.jpg'}
          alt="card-image"
          className="h-full w-full object-cover rounded p-1"
        />
      </CardHeader>
      <CardBody className="p-2 sm:p-2 pl-4 pb-0 bg-[#F5F7FB]">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-semibold">
            {name}
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
      <CardFooter className="pt-0 flex justify-center bg-[#F5F7FB] pb-4">
        <Link href={`/events/${eventID}`}>
          <Button
            ripple={false}
            fullWidth={false}
            className="bg-accent px-4 py-1 rounded shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            View event
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}