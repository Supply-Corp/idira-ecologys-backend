export class SupervisorEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly email: string,
        public readonly dni: string,

        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) {}

    static fromObject(object: { [key: string]: any }) {
        const { id, name, email, dni, createdAt, updatedAt } = object;

        if (!id) throw "missing id";
        if (!name) throw "missing name";
        if (!email) throw "missing email";
        if (!dni) throw "missing dni";

        return new SupervisorEntity(id, name, email, dni, updatedAt, createdAt);
    }
}
