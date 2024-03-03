import { prisma } from "../../../configuration";
import { CreateSedeDto, CustomError, DeleteSedeDto, GetSedeDto, PaginationDto, SedeEntity, UpdateSedeDto } from "../../../domain";

export class SedesService {

    async store(dto: CreateSedeDto) {

        try {
            const company = await prisma.company.findFirst({
                where: { id: dto.companyId }
            });

            if(!company) throw CustomError.badRequest(`No existe la empresa ${ dto.companyId }`);
            if(company.state === 'DELETE') throw CustomError.badRequest(`No existe la empresa ${ dto.companyId }`);

            const create = await prisma.sedes.create({
                data: { ...dto }
            });
            
            const sede = SedeEntity.fromObject(create);

            return { ...sede };
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateSedeDto) {
        try {
            const company = await prisma.company.findFirst({
                where: { id: dto.companyId }
            });

            if(!company) throw CustomError.badRequest(`No existe la empresa ${ dto.companyId }`);
            if(company.state === 'DELETE') throw CustomError.badRequest(`No existe la empresa ${ dto.companyId }`);

            const update = await prisma.sedes.update({
                data: { ...dto },
                where: { id: dto.id }
            });
            
            const sede = SedeEntity.fromObject(update);

            return { ...sede };
        } catch (error) {
            throw `${ error }`;
        }
    }

    async delete(dto: DeleteSedeDto) {
        try {
            const search = await prisma.sedes.findFirst({
                where: { id: dto.id }
            });

            if(!search) throw CustomError.notFound(`Sede ${dto.id} no existe`);
            if(search.state === "DELETE") throw CustomError.notFound(`Sede ${dto.id} no existe`);

            const deleted = await prisma.sedes.update({
                where: { id: dto.id },
                data: { state: "DELETE" },
            });

            const sede = SedeEntity.fromObject(deleted);

            return { ...sede };
        } catch (error) {
            throw error;
        }
    }

    async get(dto: GetSedeDto) {}
    async list(dto: PaginationDto) {}

}