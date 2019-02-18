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
            {props.id}
            {props.name}
            {props.address}
        </div>
    )
};

export default Owner;