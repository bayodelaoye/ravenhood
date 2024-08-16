import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./WhatWeOfferDropdown.css"


function WhatWeOfferDropdown() {

 const sessionUser = useSelector((store) => store.session.user);

 const navigate = useNavigate();

 const options = [
 { value: "What We Offer", label: "What We Offer" },
 { value: "Invest", label: "Invest" },
 { value: "Crypto", label: "Crypto" },
 { value: "Retirement", label: "Retirement" },
 { value: "Options", label: "Options" },
 ];

 const [selectedOfferValue, setSelectedOfferValue] = useState("");

 useEffect(() => {

   if(!sessionUser) {
        setSelectedOfferValue(selectedOfferValue);
      //   console.log("selectedOfferValue: ", selectedOfferValue)

        switch (selectedOfferValue) {
         case "What We Offer":
            navigate('/');
            break;
         case "Invest":
            navigate('/invest');
            break;
         case "Crypto":
            navigate('/crypto');
            break;
         case "Retirement":
            navigate('/retirement');
            break;
         case "Options":
            navigate('/options');
            break;
        }
      }

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
