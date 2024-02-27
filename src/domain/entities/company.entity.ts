export class CompanyEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly email: string,
        public readonly razon_social: string,
        public readonly ruc: string,
        public readonly distrito: string,
        public readonly provincia: string,
        public readonly address: string
    ) {}

    static fromObject(object: { [key: string]: any }) {
        
        const { 
            id, 
            name, 
            email, 
            razon_social, 
            ruc, 
            distrito, 
            provincia, 
            address 
        } = object;

        if (!id) throw "missing id";
        if (!name) throw "missing name";
        if (!email) throw "missing email";
        if (!razon_social) throw "missing razon_social";
        if (!ruc) throw "missing ruc";
        if (!distrito) throw "missing distrito";
        if (!provincia) throw "missing provincia";
        if (!address) throw "missing address";

        return new CompanyEntity(
            id,
            name,
            email,
            razon_social,
            ruc,
            distrito,
            provincia,
            address
        );
    }
}
