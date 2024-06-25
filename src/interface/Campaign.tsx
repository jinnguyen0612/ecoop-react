export interface Product{
    id: string;
    name: string;
    image: string;
}

export interface CampaignItem {
    id: number;
    name: string;
    image:string;
    description: string;
    url: string;
    products: number[];
    commission: number;
    start: string;
    end: string;
}
