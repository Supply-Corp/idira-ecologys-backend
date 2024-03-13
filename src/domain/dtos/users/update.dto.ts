import { Request } from "express";
import { Schema } from "express-validator";
import { FieldQuery } from "../../utils/field-query.util";
import { FieldValidation } from "../../utils/field-validation.util";
import { Roles } from "../../interfaces/roles";
import { UserValidationMiddleware } from "../../../presentation/middlewares";

export class UpdateUserDto {

    constructor(
        public readonly id: number,
        public readonly email: string,
        public readonly name: string,
        public readonly password: string,
        public readonly role: Roles,
        public readonly sedeId?: number
    ) {}

    private static schema: Schema = {
        id: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Id de usuario requerido"
            },
            isNumeric: {
                bail: true,
                errorMessage: "Id de usuario no es un número",
            },
        },
        email: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: 'Email es requerido'
            },
            isEmail: {
                bail: true,
                errorMessage: 'Email es inválido'
            },
            optional: {
                options: { nullable: true, checkFalsy: true },
            },
        },
        name: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: 'Nombre es requerido'
            },
            optional: {
                options: { nullable: true, checkFalsy: true },
            },
        },
        password: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: 'Contraseña es requerido'
            },
            isLength: {
                options: {
                    min: 8,
                },
                errorMessage: 'Contraseña requiere mínimo 8 caracteres'
            },
            optional: {
                options: { nullable: true, checkFalsy: true },
            },
        },
        role: {
            trim: true,
            notEmpty: {
                bail:true,
                errorMessage: 'Rol es requerido'
            },
            optional: {
                options: { nullable: true, checkFalsy: true },
            },
            custom: {
                bail: true,
                options: UserValidationMiddleware.role
            }
        },
        sedeId: {
            trim: true,
            isNumeric: {
                bail: true,
                errorMessage: 'Sede no es numérico'
            },
            custom: {
                bail: true,
                options: UserValidationMiddleware.sede
            },
            optional: {
                options: { nullable: true, checkFalsy: true },
            },
        }
    }

    static async create(req: Request): Promise<[FieldQuery[]?, UpdateUserDto?]> {
        const {
            email,
            name,
            password,
            role,
            sedeId
        } = req.body;

        const id = req.params.id;

        try {
            const valid = await FieldValidation.validate(this.schema, req);
            return [valid, undefined];
        } catch (error) {
            return [undefined, new UpdateUserDto( +id, email, name, password, role, sedeId )];
        }
    }
}