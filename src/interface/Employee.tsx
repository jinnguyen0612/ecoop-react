export interface Rule {
    id: number;
    rule: string;
}

export interface Position {
    id: number;
    position: string;
}

export interface PositionRule{
    id: number;
    position: string;
    rule: Rule[];
}

//to set in selection
export interface Option {
    value: number;
    label: string;
}

export interface Employee {
    id: number;
    username: string;
    phone: string;
    create_date: string;
    create_time: string;
    position: string;
    status: {
        tooltip: string;
        color: string;
    };
}

export interface Collaborator{
    id: number;
    name: string;
    avt: string;
    email: string;
    phone:string;
    presenter:string;
    create: string;
    status: { tooltip: string; color: string }
}

