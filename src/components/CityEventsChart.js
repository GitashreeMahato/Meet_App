import { useState, useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const CityEventChart = ({ allLocations, events })=>{
    const [data, setdata] = useState([]);

    useEffect (()=>{
        setdata(getData());
    // }, [`${events}`]) //displays no of events as per user's choice
    }, [`${events}`]);

    const getData = ()=>{
        const data = allLocations.map((location)=>{
            const count = events.filter((event) => event.location === location).length
            const city = location.split((/, | - /))[0]
            return { city, count };
        });
        return data;
    };


    return(
        <ResponsiveContainer width="99%" height={400} >
            <ScatterChart 
            margin={{
                top: 20,
                right: 20,
                bottom: 60,
                left: -30,
            }}>
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="City" 
                angle={60} interval={0} tick={{dx: 20, dy: 40, fontSize: 14}}  /> {/* Strings in Recharts take the type category */}
                <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} />
                <Tooltip cursor={{strokeDasharray: '3 3'}} />
                <Scatter name="A school" data={data} fill="#8884d8" />
            </ScatterChart>
            
        </ResponsiveContainer>
    )
}
export default CityEventChart;