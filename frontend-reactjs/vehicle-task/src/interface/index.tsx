export interface VehicleAndOwnerData extends Vehicle, Owner {

}

export interface Vehicle {
    vin: string;
    reg_number: string;
    signal: boolean;
}

export interface Owner {
    user_id: number;
    customer_name: string;
    customer_address: string;
}

export interface SimulatedSignal {
    vin: string;
    signal: boolean
}