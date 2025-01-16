export interface ElementType {
    id?: number;
    name: string;
    color: string;
    organization_id?: number;
    created_at?: string;
    updated_at?: string;
    description: string;
    people_count: number;
    length: number;
}

export type ElementTypeFormData = Pick<
    ElementType,
    "id" | "name" | "color" | "description" | "people_count" | "length"
>;

export const defaultElementType: ElementType = {
    name: "",
    color: "#abb8c3",
    description: "",
    people_count: 1,
    length: 1,
};
