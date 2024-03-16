import { States } from "../interfaces/states";
import { SubDirectoryEntity } from "./subdirectory.entity";

export class SubDirectoryYearEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly subDirectoryId: number,
        public readonly state: States,

        public readonly SubDirectory?: SubDirectoryEntity,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) {}

    static fromObject(object: { [key: string]: any }) {
        const { 
            id, 
            name, 
            subDirectoryId, 
            state, 
            SubDirectory,
            createdAt, 
            updatedAt 
        } = object;

        if (!id) throw "missing id";
        if (!name) throw "missing name";
        if (!subDirectoryId) throw "missing subDirectoryId";
        if (!state) throw "missing state";
        if (!(state as States)) throw "missing state";

        
        return new SubDirectoryYearEntity(id, name, subDirectoryId, state, SubDirectory, createdAt, updatedAt);
    }
}
