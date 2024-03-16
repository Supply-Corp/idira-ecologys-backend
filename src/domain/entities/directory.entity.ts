import { States } from "../interfaces/states";

export class DirectoryEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly state: States,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) {}

    static fromObject(object: { [key: string]: any }) {
        const { id, name, state, createdAt, updatedAt } = object;

        if (!id) throw "missing id";
        if (!name) throw "missing name";
        if (!state) throw "missing state";
        if (!(state as States)) throw "missing state";

        return new DirectoryEntity(id, name, state, createdAt, updatedAt);
    }
}
