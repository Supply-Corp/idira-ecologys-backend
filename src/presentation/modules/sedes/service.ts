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

    }
    
    async delete(dto: DeleteSedeDto) {}
    async get(dto: GetSedeDto) {}
    async list(dto: PaginationDto) {}

}