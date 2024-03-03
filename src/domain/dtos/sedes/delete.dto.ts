import { Schema } from "express-validator";
import { FieldQuery } from "../../utils/field-query.util";


export class DeleteSedeDto {

    constructor() {
        
    }

    private schema: Schema = {

    }

    static async create(req: Request): Promise<[FieldQuery[]?, DeleteSedeDto?]> {}

}