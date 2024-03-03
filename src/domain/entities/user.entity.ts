import { Roles } from "../interfaces/roles";

export class UserEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: Roles,
        public readonly sedeId?: number
    ) {}

    static fromObject(object: { [key: string]: any }) {
        const { id, name, email, password, role, sedeId } = object;

        if (!id) throw "missing id";
        if (!name) throw "missing name";
        if (!email) throw "missing email";
        if (!password) throw "missing password";
        if (!role) throw "missing role";
        if (!sedeId) throw "missing sedeId";

        return new UserEntity(id, name, email, password, role, sedeId);
    }
}
