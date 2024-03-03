import { Request } from "express";
import { Schema } from "express-validator";
import { FieldQuery } from "../../utils/field-query.util";

export class CreateSedeDto {

    constructor() {

    }

    private schema: Schema = {

    }

    static async create(req: Request): Promise<[FieldQuery[]?, CreateSedeDto?]> {}
}