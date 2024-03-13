import { Request } from "express";
import { Schema } from "express-validator";
import { FieldQuery } from "../../utils/field-query.util";
import { FieldValidation } from "../../utils/field-validation.util";
import { Roles } from "../../interfaces/roles";
import { UserValidationMiddleware } from "../../../presentation/middlewares";

export class CreateUserDto {

    constructor(
        public readonly email: string,
        public readonly name: string,
        public readonly password: string,
        public readonly role: Roles,
        public readonly sedeId?: number
    ) {}

    private static schema: Schema = {
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
            custom: {
                bail: true,
                options: UserValidationMiddleware.email
            }
        },
        name: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: 'Nombre es requerido'
            }
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
            }
        },
        role: {
            trim: true,
            notEmpty: {
                bail:true,
                errorMessage: 'Rol es requerido'
            },
            custom: {
                bail: true,
                options: UserValidationMiddleware.role
            }
        },
        sedeId: {
            trim: true,
            optional: {
                options: { nullable: true, checkFalsy: true },
            },
            isNumeric: {
                bail: true,
                errorMessage: 'Sede no es numérico'
            },
            custom: {
                bail: true,
                options: UserValidationMiddleware.sede
            }
        }
    }

    static async create(req: Request): Promise<[FieldQuery[]?, CreateUserDto?]> {
        const {
            email,
            name,
            password,
            role,
            sedeId
        } = req.body;

        try {
            const valid = await FieldValidation.validate(this.schema, req);
            return [valid, undefined];
        } catch (error) {
            return [undefined, new CreateUserDto( email, name, password, role, sedeId )];
        }
    }
}