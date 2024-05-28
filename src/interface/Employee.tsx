export interface Rule {
    id: number;
    rule: string;
}

export interface Position {
    id: number;
    position: string;
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

