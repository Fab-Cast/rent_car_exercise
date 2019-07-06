export interface ContractModel {
    car: Car;
    user: User;
    rent: Rent;
}

interface Rent {
    date_start: string;
    date_end: string;
}

interface User {
    name: string;
    firstname: string;
}

interface Car {
    modele: string;
    plate_registration: string;
    kilometers: number;
    defects: string[];
}