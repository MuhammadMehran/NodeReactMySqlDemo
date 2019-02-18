export interface VehicleAndOwnerData extends Vehicle, Owner {

}

export interface Vehicle {
    vin: string;
    regNumber: string;
    signal: boolean;
}

export interface Owner {
    ownerId: number;
    owner: string;
    ownerAddess: string;
}