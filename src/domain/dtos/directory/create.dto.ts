import { Schema } from "express-validator";
import { FieldQuery } from "../../utils/field-query.util";
import { FieldValidation } from "../../utils/field-validation.util";
import { Request } from "express";

export class CreateDirectoryDto {
    constructor(public readonly name: string) {}

    private static schema: Schema = {
        name: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Nombre es requerido",
            },
        },
    };

    static async create(req: Request): Promise<[FieldQuery[]?, CreateDirectoryDto?]> {
        const { name } = req.body;

        try {
            const valid = await FieldValidation.validate(this.schema, req);
            return [valid, undefined];
        } catch (error) {
            return [undefined, new CreateDirectoryDto(name)];
        }
    }
}
