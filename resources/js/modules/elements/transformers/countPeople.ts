import { Block } from "@/types/element.d";
import { Parade } from "@/types/parade.d";

export const countBlockPeople = (block: Block): number => {
    return (block.elements ?? []).reduce((acc, element) => {
        return acc + element.people_count;
    }, 0);
};

export const countParadePeople = (parade: Parade): number => {
    return (parade.blocks ?? []).reduce((acc, block) => {
        return acc + countBlockPeople(block);
    }, 0);
};
