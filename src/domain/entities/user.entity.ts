import { Sedes } from "@prisma/client";
import { Roles } from "../interfaces/roles";
import { States } from "../interfaces/states";

export class UserEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: Roles,
        public readonly state: States,
        public readonly sedeId?: number,
        public readonly sede?: Sedes,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}

    static fromObject(object: { [key: string]: any }) {
        const { id, name, email, password, role, state, sedeId, sede, createdAt, updatedAt } = object;

        if (!id) throw "missing id";
        if (!name) throw "missing name";
        if (!email) throw "missing email";
        if (!password) throw "missing password";
        if (!role) throw "missing role";
        if (!state) throw "missing state";

        return new UserEntity(id, name, email, password, role, state, sedeId, sede, createdAt, updatedAt);
    }
}
