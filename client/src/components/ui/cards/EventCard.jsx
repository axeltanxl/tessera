'use client';
import { format } from 'date-fns';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";

function formatDate(inputDate) {
  if (inputDate !== undefined && inputDate !== null) {
    const formattedDate = format(new Date(inputDate), 'dd MMM yyyy');
    return formattedDate;
  }
}

export function EventCard({ details }) {
  const { eventID, category, description, duration, endDate, maxSlots, name, pricePerCategory, startDate, venueID, displayImage } = details;
  return (
    <Card className="w-full z-0 bg-[#F5F7FB] hover:cursor-pointer hover:mix-blend-multiply shadow-md">
      <div className='relative bg-clip-border rounded-xl overflow-hidden text-gray-700 h-52 bg-[#F5F7FB] p-2'>
        <img
          src={displayImage === "" ? 'grey-temp.jpg' : displayImage}
          alt="card-image"
          className="h-full w-full object-cover rounded"
        />
      </div>
      <CardBody className="py-0">
        <div className="flex flex-col justify-between">
          <p color="blue-gray" className="font-semibold">
            {name}
          </p>
          <p
            className="font-normal opacity-75 text-sm"
          >{formatDate(startDate)} to {formatDate(endDate)}
          </p>
        </div>

        <p className="inline-block text-black text-xs px-2 rounded-full bg-slate-200 mb-2"
        >{category}
        </p>
      </CardBody>
      <CardFooter className="pt-2 justify-center bg-[#F5F7FB] pb-4 rounded-lg">
        <Link href={`/events/${eventID}`}>
          <Button
            ripple={false}
            fullWidth={false}
            className="bg-accent text-black px-4 py-2 rounded-md w-full shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            View event
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}