import { Schema } from "express-validator";
import { FieldQuery } from "../../utils/field-query.util";
import { Request } from "express";
import { FieldValidation } from "../../utils/field-validation.util";

export class UpdateCompanyDto {

    constructor(
        public readonly id: number,
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
        public readonly email_supervisor?: string,
    ) {}

    private static schema: Schema = {
        id: {
            notEmpty: {
                bail: true,
                errorMessage: 'Id es requerido'
            },
        },
        name: {
            optional: {
                options:  { nullable: true, checkFalsy: true }
            }
        },
        email: {
            isEmail: {
                bail: true,
                errorMessage: "Email es inválido",
            },
            optional: {
                options:  { nullable: true, checkFalsy: true }
            }
        },
        razon_social: {
            optional: {
                options:  { nullable: true, checkFalsy: true }
            }
        },
        ruc: {
            optional: {
                options:  { nullable: true, checkFalsy: true }
            }
        },
        distrito: {
            optional: {
                options:  { nullable: true, checkFalsy: true }
            }
        },
        provincia: {
            optional: {
                options:  { nullable: true, checkFalsy: true }
            }
        },
        address: {
            optional: {
                options:  { nullable: true, checkFalsy: true }
            }
        },
        name_representative: {
            optional: {
                options:  { nullable: true, checkFalsy: true }
            }
        },
        dni_representative: {
            optional: {
                options:  { nullable: true, checkFalsy: true }
            }
        },
        email_representative: {
            isEmail: {
                bail: true,
                errorMessage: "Email es inválido",
            },
            optional: {
                options:  { nullable: true, checkFalsy: true }
            }
        },
        name_general_manager: {
            optional: {
                options:  { nullable: true, checkFalsy: true }
            }
        },
        dni_general_manager: {
            optional: {
                options:  { nullable: true, checkFalsy: true }
            }
        },
        email_general_manager: {
            isEmail: {
                bail: true,
                errorMessage: "Email es inválido",
            },
            optional: {
                options:  { nullable: true, checkFalsy: true }
            }
        },
        name_supervisor: {
            optional: {
                options:  { nullable: true, checkFalsy: true }
            }
        },
        dni_supervisor: {
            optional: {
                options:  { nullable: true, checkFalsy: true }
            }
        },
        email_supervisor: {
            isEmail: {
                bail: true,
                errorMessage: "Email es inválido",
            },
            optional: {
                options:  { nullable: true, checkFalsy: true }
            }
        },
    };

    static async create(req: Request): Promise<[FieldQuery[]?, UpdateCompanyDto?]> {

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
            email_supervisor
        } = req.body;

        const id = req.params.id;

        try {
            const valid = await FieldValidation.validate(this.schema, req);
            return [valid, undefined];
        } catch (error) {
            return [undefined, new UpdateCompanyDto(
                +id,
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
            )];
        }
    }
}