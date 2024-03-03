import { Schema } from "express-validator";
import { FieldQuery } from "../../utils/field-query.util";
import { FieldValidation } from "../../utils/field-validation.util";
import { Request } from "express";

export class UpdateSedeDto {

    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly address: string,
        public readonly email: string,
        public readonly companyId: number
    ) {}

    private static schema: Schema = {

    }

    static async create(req: Request): Promise<[FieldQuery[]?, UpdateSedeDto?]> {
        const {
            name,
            address,
            email,
            companyId
        } = req.body;

        const id = req.params.id;

        try {
            const valid = await FieldValidation.validate(this.schema, req);
            return [valid, undefined];
        } catch (error) {
            return [
                undefined,
                new UpdateSedeDto(
                    +id,
                    name,
                    address,
                    email,
                    companyId
                ),
            ];
        }
    }

}