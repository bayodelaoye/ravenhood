import { useEffect, useState } from "react";
import "./FlagDropdown.css"
// Creating a function to add DropDown options with respect to their values
function FlagDropdown() {

 const options = [
 { value: "US", label: "🇺🇸 US" },
 { value: "UK", label: "🇬🇧 UK" },
 { value: "EU", label: "🇪🇺 EU" },
 ];

 const [selectedFlagValue, setSelectedFlagValue] = useState(options[0].value);

 useEffect(() => {

        setSelectedFlagValue(selectedFlagValue);
      //   console.log("selectedFlagValue: ", selectedFlagValue)

 }, [selectedFlagValue])

return (
 <select
    name="FlagDropdownSelect"
    id="FlagDropdownSelect"
    value={selectedFlagValue}
    onChange={(e) => setSelectedFlagValue(e.target.value)}
 >

    {options.map((option) => (
        <option
            key={option.value}
            value={option.value}
            label={option.label}
        >{option.label}
        </option>))
     }
   </select>
 );
}
export default FlagDropdown;
