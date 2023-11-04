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
 
export function AdminDropDown({name, dropdownItems, handleChange}) {
  const defaultName = name === "Venue" ? "Venue not selected" : "Not selected"
  const [position, setPosition] = React.useState(defaultName);
  console.log("position:", position);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`rounded-sm h-8 hover:bg-[#F5F7FB] ${name === "Venue" ? "w-56":"w-36"}`}>{position}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#FDFBFF]">
        {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
        <DropdownMenuSeparator />
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