import { useState } from "react";

const NumberOfEvents =({setCurrentNOE, setErrorAlert})=>{
    const [query, setQuery] = useState("32");
    const handleInputChanged =(event)=>{
        const value = event.target.value;
        setQuery(value);
        setCurrentNOE(value);
        // onEventNumberChange(value);

        let errortext;
        if(isNaN(value) || value <= 0){
            errortext = 'Please enter a valid number'
        }else{
            errortext = "";
            setCurrentNOE(value);
        }
        setErrorAlert(errortext);
    }
    return(
        <div id="number-of-events">
            <input type="text" className="textboxNumber" 
            placeholder="Enter a number"
            // defaultValue="32"
            value={query}
            onChange={handleInputChanged}
            />
        </div>
    )
}
export default NumberOfEvents;