export interface OrderAction {
    id: number;
    order_id: number;
    action: string;
    date: string;
    time: string;
    from: string;
    action_type: {
        tooltip: string;
        color: string;
    };
}

export interface SystemAction {
    id: number;
    action: string;
    date: string;
    time: string;
    from: string;
    to: string;
}

