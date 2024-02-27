import { Request } from "express";
import { Schema, checkSchema, validationResult } from "express-validator";
import { FieldQuery } from "./field-query.util";

export class FieldValidation {

    static async validate (schema: Schema, req: Request): Promise<FieldQuery[]> {

        await checkSchema(schema).run(req);

        const validated = validationResult(req);
        if( !validated.isEmpty() ) {
            const listErrors = validated.array().map(FieldQuery.fromObject);
            return listErrors;
        }

        throw undefined;
    }

}