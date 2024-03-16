import { prisma } from "../../../configuration";
import {
  CreateDirectoryDto,
  CustomError,
  DeleteDto,
  DirectoryEntity,
  GetDto,
  PaginationDto,
  PaginationGenerate,
  UpdateDirectoryDto,
} from "../../../domain";

export class DirectoryService {

  async store(dto: CreateDirectoryDto) {
    try {
      const create = await prisma.directory.create({
        data: dto
      });

      const directory = DirectoryEntity.fromObject(create);

      return {
        ...directory
      };
    } catch (error) {
      throw error;
    }
  }

  async update(dto: UpdateDirectoryDto) {
    try {
      const valid = await prisma.directory.findFirst({ where: { id: dto.id } });

      if(!valid) throw CustomError.notFound("Directorio no existe");
      if(valid.state === "DELETE") throw CustomError.notFound("Directorio no existe");

      const update = await prisma.directory.update({
        where: { id: dto.id },
        data: dto
      });

      const directory = DirectoryEntity.fromObject(update);

      return {
        ...directory
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(dto: DeleteDto) {
    try {
      const valid = await prisma.directory.findFirst({ where: { id: dto.id } });
      
      if(!valid) throw CustomError.notFound("Directorio no existe");
      if(valid.state === "DELETE") throw CustomError.notFound("Directorio no existe");

      const update = await prisma.directory.update({
        where: { id: dto.id },
        data: { state: "DELETE" }
      });

      const directory = DirectoryEntity.fromObject(update);
      
      return {
        ...directory
      };
    } catch (error) {
      throw error;
    }
  }

  async get(dto: GetDto) {
    try {
      const valid = await prisma.directory.findFirst({ where: { id: dto.id } });
      
      if(!valid) throw CustomError.notFound("Directorio no existe");
      if(valid.state === "DELETE") throw CustomError.notFound("Directorio no existe");

      const directory = DirectoryEntity.fromObject(valid);
      
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
        prisma.directory.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: {
            state: "ACTIVE",
            name: { startsWith: search } 
          },
          orderBy: { id: "desc" },
        }),
        prisma.directory.count({
          where: {
            state: "ACTIVE",
            name: { startsWith: search } 
          },
        }),
      ]);

      const data = results.map(DirectoryEntity.fromObject);

      const pagination = PaginationGenerate.create({
        page,
        limit,
        total,
        search,
        url: "directory",
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
