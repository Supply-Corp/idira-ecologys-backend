import { Schema } from "express-validator";
import { FieldQuery } from "../../utils/field-query.util";
import { Request } from "express";
import { FieldValidation } from "../../utils/field-validation.util";

export class CreateCompanyDto {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly razon_social: string,
        public readonly ruc: string,
        public readonly distrito: string,
        public readonly provincia: string,
        public readonly address: string,

        public readonly name_representative: string,
        public readonly dni_representative: string,

        public readonly name_general_manager: string,
        public readonly dni_general_manager: string,

        public readonly name_supervisor: string,
        public readonly dni_supervisor: string,

        public readonly email_representative?: string,
        public readonly email_general_manager?: string,
        public readonly email_supervisor?: string
    ) {}

    private static schema: Schema = {
        name: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Nombre es requerido",
            },
        },
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
        razon_social: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Razón social es requerido",
            },
        },
        ruc: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Ruc es requerido",
            },
        },
        distrito: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Distrito es requerido",
            },
        },
        provincia: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Provincia es requerido",
            },
        },
        address: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Dirección es requerido",
            },
        },
        name_representative: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Nombre representante es requerido",
            },
        },
        dni_representative: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Dni representante es requerido",
            },
        },
        email_representative: {
            trim: true,
            isEmail: {
                bail: true,
                errorMessage: "Email representante inválido",
            },
            optional: {
                options: { nullable: true, checkFalsy: true },
            },
        },
        name_general_manager: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Nombre gerente es requerido",
            },
        },
        dni_general_manager: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Dni gerente es requerido",
            },
        },
        email_general_manager: {
            trim: true,
            isEmail: {
                bail: true,
                errorMessage: "Email gerente inválido",
            },
            optional: {
                options: { nullable: true, checkFalsy: true },
            },
        },
        name_supervisor: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Nombre supervisor es requerido",
            },
        },
        dni_supervisor: {
            trim: true,
            notEmpty: {
                bail: true,
                errorMessage: "Dni supervisor es requerido",
            },
        },
        email_supervisor: {
            trim: true,
            isEmail: {
                bail: true,
                errorMessage: "Email supervisor inválido",
            },
            optional: {
                options: { nullable: true, checkFalsy: true },
            },
        },
    };

    static async create(req: Request): Promise<[FieldQuery[]?, CreateCompanyDto?]> {
        const {
            name,
            email,
            razon_social,
            ruc,
            distrito,
            provincia,
            address,

            name_representative,
            dni_representative,
            email_representative,

            name_general_manager,
            dni_general_manager,
            email_general_manager,

            name_supervisor,
            dni_supervisor,
            email_supervisor,
        } = req.body;

        try {
            const valid = await FieldValidation.validate(this.schema, req);
            return [valid, undefined];
        } catch (error) {
            return [
                undefined,
                new CreateCompanyDto(
                    name,
                    email,
                    razon_social,
                    ruc,
                    distrito,
                    provincia,
                    address,

                    name_representative,
                    dni_representative,

                    name_general_manager,
                    dni_general_manager,

                    name_supervisor,
                    dni_supervisor,

                    email_representative,
                    email_general_manager,
                    email_supervisor
                ),
            ];
        }
    }
}
