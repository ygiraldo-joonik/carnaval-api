import { Block, Element } from "./element";

export type Parade = {
    id?: number;

    name: string;
    description?: string;
    date: string;
    distance: number;
    start_location: string;
    end_location: string;
    duration: number;
    street_width: number;
    total_duration: number;
    people_count: number;
    elements_length: number;

    duration_object?: Duration;

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
    | "duration"
    | "street_width"
    | "start_location"
    | "end_location"
>;

export const defaultParade: Parade = {
    name: "",
    description: "",
    date: "",
    distance: 1000,
    start_location: "---",
    end_location: "---",
    duration: 0,
    street_width: 8,
    durationObject: { hours: 0, minutes: 0 },
};

export type Duration = { hours: number; minutes: number };

export type ParadeControlDataSet = {
    duration: number;
    delay: number;
    on_time: boolean;
};

export type ParadeControlUsersDataSet = {
    [key: number]: {
        [key: number]: ParadeControlDataSet | null;
    };
};

export type ElementEntity = Pick<Element, "name", "duration", "order"> & {
    block: string;
    in_block_order: number;
    accumulated_duration: number;
};

export type ParadeControlEntities = {
    elements: {
        [key: number]: ElementEntity;
    };
    users: {
        [key: number]: {
            name: string;
            order: number;
        };
    };
};

export type ParadeControlDataType = {
    distanceFromFirst: ParadeControlUsersDataSet;
    distanceFromPrevious: ParadeControlUsersDataSet;
    entities: ParadeControlEntities;
    isThereData: boolean;
};

export type ParadeAnalisysElement = {
    id: number;
    name: string;
    block: string;
    duration: number;
    accumulated_duration: number;
    order: number;
    in_block_order: number;
    last_pole: ParadeElementPole;
    poles: ParadeElementPole[];
};

export type ParadeElementPole = {
    passed_at: string;
    user: string;
    user_id: number;
    distance_from_first: ParadeControlDataSet | null;
    distance_from_previous: ParadeControlDataSet | null;
};
