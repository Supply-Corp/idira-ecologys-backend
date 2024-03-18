import { prisma } from "../../../configuration";
import { SubDirectoryYearEntity } from '../../../domain/entities/subdirectory-year.entity';
import {
  CreateSubDirectoryYearDto,
  CustomError,
  DeleteDto,
  GetDto,
  PaginationDto,
  PaginationGenerate,
  UpdateSubDirectoryYearDto,
} from "../../../domain";

export class SubDirectoryYearService {

  async store(dto: CreateSubDirectoryYearDto) {
    try {
      const valid = await prisma.subDirectory.findFirst({ where: { id: dto.subDirectoryId }});
      
      if(!valid) throw CustomError.notFound("SubDirectorio no existe");
      if(valid.state === "DELETE") throw CustomError.notFound("SubDirectorio no existe");

      const create = await prisma.subDirectoryYear.create({
        data: dto
      });

      const directory = SubDirectoryYearEntity.fromObject(create);

      return {
        ...directory
      };
    } catch (error) {
      throw error;
    }
  }

  async update(dto: UpdateSubDirectoryYearDto) {
    try {
      const valid = await prisma.subDirectoryYear.findFirst({ where: { id: dto.id } });

      if(!valid) throw CustomError.notFound("SubDirectorio no existe");
      if(valid.state === "DELETE") throw CustomError.notFound("SubDirectorio no existe");

      const update = await prisma.subDirectoryYear.update({
        where: { id: dto.id },
        data: dto
      });

      const directory = SubDirectoryYearEntity.fromObject(update);

      return {
        ...directory
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(dto: DeleteDto) {
    try {
      const valid = await prisma.subDirectoryYear.findFirst({ where: { id: dto.id } });
      
      if(!valid) throw CustomError.notFound("SubDirectorio no existe");
      if(valid.state === "DELETE") throw CustomError.notFound("SubDirectorio no existe");

      const update = await prisma.subDirectoryYear.update({
        where: { id: dto.id },
        data: { state: "DELETE" }
      });

      const directory = SubDirectoryYearEntity.fromObject(update);
      
      return {
        ...directory
      };
    } catch (error) {
      throw error;
    }
  }

  async get(dto: GetDto) {
    try {
      const valid = await prisma.subDirectoryYear.findFirst({ where: { id: dto.id } });
      
      if(!valid) throw CustomError.notFound("SubDirectorio no existe");
      if(valid.state === "DELETE") throw CustomError.notFound("SubDirectorio no existe");

      const directory = SubDirectoryYearEntity.fromObject(valid);
      
      return {
        ...directory
      };
    } catch (error) {
      throw error;
    }
  }

  async list(dto: PaginationDto, id: number) {
    const { page, limit, search } = dto;

    try {
      const [results, total] = await Promise.all([
        prisma.subDirectoryYear.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: {
            state: "ACTIVE",
            name: { startsWith: search } ,
            subDirectoryId: id
          },
          include: {
            SubDirectory: true
          },
          orderBy: { id: "desc" },
        }),
        prisma.subDirectoryYear.count({
          where: {
            state: "ACTIVE",
            name: { startsWith: search } ,
            subDirectoryId: id
          },
        }),
      ]);

      const data = results.map(SubDirectoryYearEntity.fromObject);

      const pagination = PaginationGenerate.create({
        page,
        limit,
        total,
        search,
        url: "subdirectory-year",
        results: data,
      });

      return {
        ...pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}
