import { ElementType } from "./element-type";
import { defaultElement } from "@/types/element.d";

export interface Block {
    id?: number;
    name: string;
    description: string;

    order?: number;
    parade_id?: number;
    deleted_at?: any;
    created_at?: string;
    updated_at?: string;
    elements?: Element[];
}

export type BlockFormData = Pick<
    Block,
    "id" | "name" | "description" | "parade_id"
>;

export const defaultBlock: Block = {
    name: "",
    description: "",
};

export interface Element {
    id?: number;
    name: string;
    description: string;
    people_count: number;
    length: number;

    order?: number;
    element_type_id?: number;
    block_id?: number;
    created_at?: string;
    updated_at?: string;
    passed?: boolean;
    inferred?: boolean;
    type?: ElementType;
}

export type ElementFormData = Pick<
    Element,
    | "id"
    | "name"
    | "description"
    | "element_type_id"
    | "block_id"
    | "people_count"
    | "length"
>;

export const defaultElement: Element = {
    name: "",
    description: "",
    people_count: 1,
    length: 1,
};
