import { CompanyEntity } from "./company.entity";

export class SedeEntity {

    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly address: string,
        public readonly email: string,
        public readonly companyId: number,

        public readonly company?: CompanyEntity,
        
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}

    static fromObject(object: { [key: string]: any }){
        const {
            id,
            name,
            address,
            email,
            companyId,
            company,
            createdAt,
            updatedAt
        } = object;

        if(!id) throw 'missing id';
        if(!name) throw 'missing name';
        if(!address) throw 'missing address';
        if(!email) throw 'missing email';
        if(!companyId) throw 'missing companyId';
         
        return new SedeEntity(
            id,
            name,
            address,
            email,
            companyId,
            company,
            createdAt,
            updatedAt
        );
    }

}