"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// import { formatInTimeZone } from 'date-fns-tz';

type DatePickerProps = {
    defaultDate: Date;
    handleChange: (date: Date) => void;
    resetTrigger: number;
}

export function DatePicker({ defaultDate, handleChange, resetTrigger }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(defaultDate);

  React.useEffect(() => {
    if (!date) return;
    console.log(date);
    handleChange(date);
  }, [date]);
  
  React.useEffect(() => {
    setDate(defaultDate)
  }, [resetTrigger])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
