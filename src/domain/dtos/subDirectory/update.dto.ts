import { Schema } from "express-validator";
import { FieldQuery } from "../../utils/field-query.util";
import { FieldValidation } from "../../utils/field-validation.util";
import { Request } from "express";

export class UpdateSubDirectoryDto {
    constructor(
        public readonly id: number,
        public readonly name: string
    ) {}

    private static schema: Schema = {
        id: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Id es requerido"
            },
            isNumeric: {
                bail: true,
                errorMessage: "Id no es numérico"
            }
        },
        name: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Nombre es requerido",
            },
        },
    };

    static async create(req: Request): Promise<[FieldQuery[]?, UpdateSubDirectoryDto?]> {
        const { name } = req.body;
        const id = req.params.id;

        try {
            const valid = await FieldValidation.validate(this.schema, req);
            return [valid, undefined];
        } catch (error) {
            return [undefined, new UpdateSubDirectoryDto(+id,name)];
        }
    }
}
