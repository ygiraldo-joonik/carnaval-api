import { Block } from "./element";

export type Parade = {
    id?: number;

    name: string;
    description?: string;
    date: string;
    distance: number;
    start_location: string;
    end_location: string;

    event_id?: number;
    deleted_at?: any;
    created_at?: string;
    updated_at?: string;

    blocks?: Block[];
};

export type ParadeFormData = Pick<
    Parade,
    | "id"
    | "name"
    | "description"
    | "date"
    | "distance"
    | "start_location"
    | "end_location"
>;

export const defaultParade: Parade = {
    name: "",
    description: "",
    date: "",
    distance: 1,
    start_location: "",
    end_location: "",
};
