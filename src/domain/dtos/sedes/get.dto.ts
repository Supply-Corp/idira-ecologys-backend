import { Schema } from "express-validator";
import { FieldQuery } from "../../utils/field-query.util";
import { FieldValidation } from "../../utils/field-validation.util";
import { Request } from "express";


export class GetSedeDto {

    constructor(
        public readonly id: number
    ) {}

    private static schema: Schema = {
        id: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: 'Id es requerido'
            },
            isNumeric: {
                bail: true,
                errorMessage: 'Id no es numérico'
            }
        }
    }

    static async create(req: Request): Promise<[FieldQuery[]?, GetSedeDto?]> {
        const id = req.params.id;

        try {
            const valid = await FieldValidation.validate(this.schema, req);
            return [valid, undefined];
        } catch (error) {
            return [undefined, new GetSedeDto(+id)];
        }
    }

}