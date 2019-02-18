import React from 'react';
import './Vehicle.css';

export interface VehicleProps{
    vin: string;
    regNumber: string;
    signal: boolean;
}

const Vehicle: React.SFC<VehicleProps> = (props) => {
    const circleStyleName = props.signal? "green": "red"
    return(
        <div className="Vehicle">
        <label>{props.vin}</label>
        <label>{props.regNumber}</label>
        <div className={circleStyleName}/>     
        </div>
    )
};

export default Vehicle;