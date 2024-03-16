import { Schema } from "express-validator";
import { FieldQuery } from "../../utils/field-query.util";
import { FieldValidation } from "../../utils/field-validation.util";
import { Request } from "express";

export class CreateSubDirectoryDto {
    constructor(
        public readonly name: string,
        public readonly directoryId: number
    ) {}

    private static schema: Schema = {
        name: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Nombre es requerido",
            },
        },
        directoryId: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Id directorio es requerido"
            },
            isNumeric: {
                bail: true,
                errorMessage: "Id directorio no es numérico"
            }
        }
    };

    static async create(req: Request): Promise<[FieldQuery[]?, CreateSubDirectoryDto?]> {
        const { name, directoryId } = req.body;

        try {
            const valid = await FieldValidation.validate(this.schema, req);
            return [valid, undefined];
        } catch (error) {
            return [undefined, new CreateSubDirectoryDto(name, directoryId)];
        }
    }
}
