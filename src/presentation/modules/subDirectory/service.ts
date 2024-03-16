import { prisma } from "../../../configuration";
import {
  CreateSubDirectoryDto,
  CustomError,
  DeleteDto,
  GetDto,
  PaginationDto,
  PaginationGenerate,
  SubDirectoryEntity,
  UpdateSubDirectoryDto,
} from "../../../domain";

export class SubDirectoryService {

  async store(dto: CreateSubDirectoryDto) {
    try {
      const valid = await prisma.directory.findFirst({ where: { id: dto.directoryId }});
      
      if(!valid) throw CustomError.notFound("Directorio no existe");
      if(valid.state === "DELETE") throw CustomError.notFound("Directorio no existe");

      const create = await prisma.subDirectory.create({
        data: dto
      });

      const directory = SubDirectoryEntity.fromObject(create);

      return {
        ...directory
      };
    } catch (error) {
      throw error;
    }
  }

  async update(dto: UpdateSubDirectoryDto) {
    try {
      const valid = await prisma.subDirectory.findFirst({ where: { id: dto.id } });

      if(!valid) throw CustomError.notFound("SubDirectorio no existe");
      if(valid.state === "DELETE") throw CustomError.notFound("SubDirectorio no existe");

      const update = await prisma.subDirectory.update({
        where: { id: dto.id },
        data: dto
      });

      const directory = SubDirectoryEntity.fromObject(update);

      return {
        ...directory
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(dto: DeleteDto) {
    try {
      const valid = await prisma.subDirectory.findFirst({ where: { id: dto.id } });
      
      if(!valid) throw CustomError.notFound("SubDirectorio no existe");
      if(valid.state === "DELETE") throw CustomError.notFound("SubDirectorio no existe");

      const update = await prisma.subDirectory.update({
        where: { id: dto.id },
        data: { state: "DELETE" }
      });

      const directory = SubDirectoryEntity.fromObject(update);
      
      return {
        ...directory
      };
    } catch (error) {
      throw error;
    }
  }

  async get(dto: GetDto) {
    try {
      const valid = await prisma.subDirectory.findFirst({ where: { id: dto.id } });
      
      if(!valid) throw CustomError.notFound("SubDirectorio no existe");
      if(valid.state === "DELETE") throw CustomError.notFound("SubDirectorio no existe");

      const directory = SubDirectoryEntity.fromObject(valid);
      
      return {
        ...directory
      };
    } catch (error) {
      throw error;
    }
  }

  async list(dto: PaginationDto) {
    const { page, limit, search } = dto;

    try {
      const [results, total] = await Promise.all([
        prisma.subDirectory.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: {
            state: "ACTIVE",
            name: { startsWith: search } 
          },
          include: {
            Directory: true
          },
          orderBy: { id: "desc" },
        }),
        prisma.subDirectory.count({
          where: {
            state: "ACTIVE",
            name: { startsWith: search } 
          },
        }),
      ]);

      const data = results.map(SubDirectoryEntity.fromObject);

      const pagination = PaginationGenerate.create({
        page,
        limit,
        total,
        search,
        url: "subdirectory",
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
