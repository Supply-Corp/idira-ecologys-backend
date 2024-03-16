import { States } from "../interfaces/states";
import { DirectoryEntity } from "./directory.entity";

export class SubDirectoryEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly directoryId: number,
        public readonly state: States,

        public readonly Directory?: DirectoryEntity,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) {}

    static fromObject(object: { [key: string]: any }) {
        const { 
            id, 
            name, 
            directoryId, 
            state, 
            Directory,
            createdAt, 
            updatedAt 
        } = object;

        if (!id) throw "missing id";
        if (!name) throw "missing name";
        if (!directoryId) throw "missing directoryId";
        if (!state) throw "missing state";
        if (!(state as States)) throw "missing state";

        
        return new SubDirectoryEntity(id, name, directoryId, state, Directory, createdAt, updatedAt);
    }
}
