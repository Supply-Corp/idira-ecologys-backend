import { Schema } from "express-validator";
import { FieldQuery } from "../../utils/field-query.util";
import { Request } from "express";
import { FieldValidation } from "../../utils/field-validation.util";

export class DeleteUserDto {
    constructor(public readonly id: number) {}

    private static schema: Schema = {
        id: {
            notEmpty: {
                bail: true,
                errorMessage: "Id es requerido",
            },
            isNumeric: {
                bail: true,
                errorMessage: "Id no es un número",
            },
        },
    };

    static async create(req: Request): Promise<[FieldQuery[]?, DeleteUserDto?]> {
        const id = req.params.id;

        try {
            const valid = await FieldValidation.validate(this.schema, req);
            return [valid, undefined];
        } catch (error) {
            return [undefined, new DeleteUserDto(+id)];
        }
    }
}
