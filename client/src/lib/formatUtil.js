import { format, parse, isDate } from 'date-fns';
export function formatDate(inputDate) {
    if (inputDate !== undefined && inputDate !== null) {
        const formattedDate = format(new Date(inputDate), 'dd MMM yyyy');
        return formattedDate;
    }
}

export function formatTime(timeString) {
    // Check if the input is a valid time string (HHmm)
    if (!/^\d{4}$/.test(timeString)) {
      return 'Invalid time';
    }
  
    // Parse the time string and create a date
    const parsedTime = parse(timeString, 'HHmm', new Date());
  
    // Check if the parsed time is a valid date
    if (isDate(parsedTime)) {
      // Format the time as AM/PM
      const formattedTime = format(parsedTime, 'h:mma');
      return formattedTime;
    } else {
      return 'Invalid time';
    }
  }