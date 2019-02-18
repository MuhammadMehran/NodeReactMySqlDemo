import React from 'react';
import './Vehicle.css';

export interface VehicleProps{
    vin: string;
    regNumber: string;
    signal: boolean;
}
const Vehicle: React.SFC<VehicleProps> = (props) => {
    return(
        <div>
            {props.vin}
            {props.regNumber}
            {props.signal}
        </div>
    )
};

export default Vehicle;