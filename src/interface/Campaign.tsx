export interface Product{
    id: string;
    name: string;
    image: string;
    tags: string;
    status: string;
}

export interface CampaignItem {
    id: number;
    name: string;
    image:string;
    description: string;
    url: string;
    products: string[];
    commission: number;
    tax: number;
    start: string;
    end: string;
}
