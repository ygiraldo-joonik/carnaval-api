import { ElementType } from "./element-type";

export interface Block {
    id: number;
    parade_id: number;
    name: string;
    description: string;
    order: number;
    deleted_at: any;
    created_at: string;
    updated_at: string;
    elements: Element[];
}

export interface Element {
    id: number;
    name: string;
    description: string;
    order: number;
    block_id: number;
    element_type_id: number;
    created_at: string;
    updated_at: string;
    passed: boolean;
    inferred: boolean;
    type: ElementType;
}
