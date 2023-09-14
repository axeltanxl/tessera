"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { DateRange } from "react-day-picker";
import { addDays, format, isBefore, isToday } from 'date-fns';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DateRangePicker({
  className,
}) {
  const [date, setDate] = React.useState({
    from: new Date(),
    to: addDays(new Date(), 20),
  })

  const today = new Date();
  const isPastDate = (day) => isBefore(day, today);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal h-8 border-[#B4C1DB] rounded-full hover:bg-[#F5F7FB]",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-[#FDFBFF]" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={(day) => isPastDate(day) && !isToday(day)}
          />
          <div className="flex "></div>
          <button>Apply</button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
