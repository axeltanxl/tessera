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
              "justify-start text-left font-normal h-8 border-[#B4C1DB] rounded-full hover:bg-[#F5F7FB]",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-0 sm:mr-2 h-4 w-4" />
            <div className="hidden sm:flex">
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
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-[#FDFBFF] z-40" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={(day) => isPastDate(day) && !isToday(day)}
            className="hidden md:block"
          />
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            disabled={(day) => isPastDate(day) && !isToday(day)}
            className="block md:hidden"
          />
          <div className="flex justify-center align-center">
          <button class="bg-[#F5F7FB] px-2 py-1 rounded-sm mb-4 text-sm text-gray-700 mr-2">Clear</button>
          <button class="bg-amber-300 px-2 py-1 rounded-sm mb-4 text-sm text-gray-700">Apply</button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
