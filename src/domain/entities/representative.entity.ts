
export class RepresentativeEntity {

    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly email: string,
        public readonly ruc: string,
        
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) {}

    static fromObject(object: { [key: string]: any }) {

        const { 
            id, 
            name, 
            email, 
            ruc,
            createdAt,
            updatedAt
        } = object;

        if (!id) throw "missing id";
        if (!name) throw "missing name";
        if (!email) throw "missing email";
        if (!ruc) throw "missing ruc";

        return new RepresentativeEntity(
            id,
            name,
            email,
            ruc,
            updatedAt,
            createdAt
        );
    }

}