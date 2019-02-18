import React from 'react';
import './Owner.css';

export interface OwnerProps{
    id: number;
    name: string;
    address: string;
}
const Owner: React.SFC<OwnerProps> = (props) => {
    return(
        <div className="Owner">
            <label>{props.name}</label>
            <label>{props.address}</label>
        </div>
    )
};

export default Owner;