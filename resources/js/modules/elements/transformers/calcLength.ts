import { Block } from "@/types/element.d";
import { Parade } from "@/types/parade.d";

export const calcBlockLength = (block: Block): number => {
    return (block.elements ?? []).reduce((acc, element) => {
        return acc + element.length;
    }, 0);
};

export const calcParadeLength = (parade: Parade): number => {
    return (parade.blocks ?? []).reduce((acc, block) => {
        return acc + calcBlockLength(block);
    }, 0);
};
