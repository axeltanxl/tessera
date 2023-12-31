"use client"
 
import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
export function RadioDropdown({name, dropdownItems, handleChange, defaultValue}) {
  const [position, setPosition] = React.useState(defaultValue);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full border-[#B4C1DB] h-8 hover:bg-[#F5F7FB] w-32">{name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#FDFBFF]">
        {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {dropdownItems.map((item, index) => {
                return(
                    <DropdownMenuRadioItem key={index} value={item} onClick={() => handleChange(item)}>{item}</DropdownMenuRadioItem>
                )
            })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}