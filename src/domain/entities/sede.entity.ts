import { States } from "../interfaces/states";
import { CompanyEntity } from "./company.entity";

export class SedeEntity {

    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly address: string,
        public readonly email: string,
        public readonly companyId: number,
        public readonly state: States,
        public readonly Company?: CompanyEntity,
        
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
            state,
            Company,
            createdAt,
            updatedAt
        } = object;

        if(!id) throw 'missing id';
        if(!name) throw 'missing name';
        if(!address) throw 'missing address';
        if(!email) throw 'missing email';
        if(!companyId) throw 'missing companyId';
        if(!state) throw 'missing state';
        if(!(state as States)) throw 'missing state';
         
        return new SedeEntity(
            id,
            name,
            address,
            email,
            companyId,
            state,
            Company,
            createdAt,
            updatedAt
        );
    }

}