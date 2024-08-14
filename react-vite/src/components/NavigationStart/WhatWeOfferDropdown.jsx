import { useEffect, useState } from "react";
import "./WhatWeOfferDropdown.css"


function WhatWeOfferDropdown() {

 const options = [
 { value: "What We Offer", label: "What We Offer" },
 { value: "Invest", label: "Invest" },
 { value: "Crypto", label: "Crypto" },
 { value: "Retirement", label: "Retirement" },
 { value: "Options", label: "Options" },
 ];

 const [selectedOfferValue, setSelectedOfferValue] = useState(options[0].value);

 useEffect(() => {

        setSelectedOfferValue(selectedOfferValue);
        console.log("selectedOfferValue: ", selectedOfferValue)

 }, [selectedOfferValue])

return (
 <select
    name="WhatWeOfferDropdownSelect"
    id="WhatWeOfferDropdownSelect"
    value={selectedOfferValue}
    onChange={(e) => setSelectedOfferValue(e.target.value)}
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
export default WhatWeOfferDropdown;
