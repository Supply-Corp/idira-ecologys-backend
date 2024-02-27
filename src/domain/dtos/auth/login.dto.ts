import { Schema } from "express-validator";
import { FieldQuery } from "../../utils/field-query.util";
import { Request } from "express";
import { FieldValidation } from "../../utils/field-validation.util";

export class LoginDto {

    constructor(
        public readonly email: string,
        public readonly password: string
    ) {}

    private static schema: Schema = {
        email: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Email es requerido",
            },
            isEmail: {
                bail: true,
                errorMessage: "Email es inválido",
            },
        },
        password: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Contraseña es requerido",
            },
            isLength: {
                bail: true,
                options: {
                min: 8,
                },
                errorMessage: "Contraseña requiere mínimo 8 caracteres",
            },
        },
    };

    static async create(req: Request): Promise<[FieldQuery[]?, LoginDto?]> {
        const { email, password } = req.body;

        try {
            const valid = await FieldValidation.validate(this.schema, req);
            return [valid, undefined];
        } catch (error) {
            return [undefined, new LoginDto(email, password)];
        }
    }
}