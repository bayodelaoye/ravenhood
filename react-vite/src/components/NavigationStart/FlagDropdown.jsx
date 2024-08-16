import { useEffect, useState } from "react";
import eu from "./Flags/eu.png"
import gb from "./Flags/gb.png"
import us from "./Flags/us.png"
import "./FlagDropdown.css"


// Creating a function to add DropDown options with respect to their values
function FlagDropdown() {


 const flags = [us, gb, eu];

 const [selectedFlag, setSelectedFlag] = useState(flags[0])

 const options = [
 { value: "US", label: "US" },
 { value: "UK", label: "UK" },
 { value: "EU", label: "EU" },
 ];

 const [selectedFlagValue, setSelectedFlagValue] = useState(options[0].value);


 useEffect(() => {

        setSelectedFlagValue(selectedFlagValue);
        console.log("selectedFlagValue: ", selectedFlagValue)
        if(selectedFlagValue === "US") setSelectedFlag(flags[0]);
        if(selectedFlagValue === "UK") setSelectedFlag(flags[1]);
        if(selectedFlagValue === "EU") setSelectedFlag(flags[2]);


 }, [selectedFlagValue])

return (
 <>
   <main id="FlagDropdownMain">
      <img src={selectedFlag} className="FlagDropdownImg"></img>
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
      </select>;
   </main>
 </>
 )
}
export default FlagDropdown;
