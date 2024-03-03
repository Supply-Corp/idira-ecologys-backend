import { Request } from "express";
import { Schema } from "express-validator";
import { FieldQuery } from "../../utils/field-query.util";
import { FieldValidation } from "../../utils/field-validation.util";

export class CreateSedeDto {

    constructor(
        public readonly name: string,
        public readonly address: string,
        public readonly email: string,
        public readonly companyId: number
    ) {}

    private static schema: Schema = {
        name: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: 'Nombre es requerido'
            }
        },
        address: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: 'Dirección es requerido'
            }
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
            }
        },
        companyId: {
            trim: true,
            notEmpty: {
                bail:true,
                errorMessage: 'Id de empresa es requerido'
            },
            isNumeric: {
                bail: true,
                errorMessage: 'Id de empresa no es un número'
            }
        }
    }

    static async create(req: Request): Promise<[FieldQuery[]?, CreateSedeDto?]> {
        const {
            name,
            address,
            email,
            companyId
        } = req.body;

        try {
            const valid = await FieldValidation.validate(this.schema, req);
            return [valid, undefined];
        } catch (error) {
            return [
                undefined,
                new CreateSedeDto(
                    name,
                    address,
                    email,
                    companyId
                ),
            ];
        }
    }
}