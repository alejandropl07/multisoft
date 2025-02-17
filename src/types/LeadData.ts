import { Estated } from "./propertyData";

export interface LeadData {
    id?: string;
    created_at?: any | {
        nanoseconds: number;
        seconds: number;
    }
    email?: string;
    leadgen_id?: string;
    owner?: boolean;
    name?: string;
    phone?: string;
    push_status?: string;
    status?: string;
    type?: string;
    visibility?: string;
    avatarColor?: string;
    subscription?: string;
    notes?: string;
    propertyData?: Estated;
    //buyer specific questions
    buyBedrooms?: string;
    buyBathrooms?: string;
    buyMinPrice?: string;
    buyMaxPrice?: string;
    homeTypes?: string[];
    workingWithAgent?: boolean;
    buyTimeframe?: string;
    mustSell?: boolean;
    buyReason?: string;
}