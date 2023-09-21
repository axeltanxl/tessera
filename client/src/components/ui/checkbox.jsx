"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef(({handleSelect, className, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const handleCheckboxChange = () => {
    // toggle the state when the checkbox is clicked
    setIsChecked(!isChecked);
    handleSelect(isChecked);
  };
  return (
  <CheckboxPrimitive.Root
    onChange={handleCheckboxChange}
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded ml-2 border border-[#B4C1DB] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}>
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
)})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
