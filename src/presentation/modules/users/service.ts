import { hashSync } from "bcrypt";
import { prisma } from "../../../configuration/database/index";
import {
  CreateUserDto,
  CustomError,
  DeleteUserDto,
  GetUserDto,
  PaginationDto,
  PaginationGenerate,
  UpdateUserDto,
  UserEntity,
} from "../../../domain";
import { HashAdapter } from "../../../configuration";

export class UserServices {
  constructor() {}

  async list(dto: PaginationDto) {
    const { page, limit, search } = dto;

        try {
            const [results, total] = await Promise.all([
                prisma.user.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    where: {
                        state: "ACTIVE",
                        name: {
                            startsWith: `%${search}%`,
                        },
                    },
                    orderBy: { id: "desc" },
                }),
                prisma.user.count({
                    where: {
                        state: "ACTIVE",
                        name: {
                            startsWith: `%${search}%`,
                        },
                    },
                }),
            ]);

            const data = results.map(user => {
                const { password, ...newUser } = user;
                return newUser;
            });

            const pagination = PaginationGenerate.create({
                page,
                limit,
                total,
                search,
                url: "users",
                results: data,
            });

            return {
                ...pagination,
            };
        } catch (error) {
            throw error;
        }
  }

  async store(dto: CreateUserDto) {
    try {

        // if(dto.sedeId && dto.role === "ADMIN" || dto.role === "USER") {
        //     throw CustomError.badRequest(`El rol ${dto.role} no requiere una sede`);
        // }else if(!dto.sedeId && dto.role === "SEDE") {
        //     throw CustomError.badRequest(`El rol ${dto.role} requiere una sede`);
        // }

        const create = await prisma.user.create({
            data: {
            email: dto.email,
            name: dto.name,
            password: HashAdapter.hash(dto.password),
            role: dto.role,
            sedeId: dto.sedeId ? dto.sedeId : null,
            },
        });

        const { password, ...user } = UserEntity.fromObject(create);

        return {
            ...user,
        };
    } catch (error) {
        throw error;
    }
  }

  async update(dto: UpdateUserDto) {
    try {
        // if(dto.sedeId && (dto.role === "ADMIN" || dto.role === "USER")) {
        //     throw CustomError.badRequest(`El rol ${dto.role} no requiere una sede`);
        // }else if(!dto.sedeId && dto.role === "SEDE") {
        //     throw CustomError.badRequest(`El rol ${dto.role} requiere una sede`);
        // }

        const valid =  await prisma.user.findFirst({ where: { id: dto.id } });

        if(!valid) throw CustomError.notFound("El usuario no existe");
        if(valid.state === 'DELETE') throw CustomError.notFound("El usuario no existe");

        if(dto.email !== valid.email) {
            const validEmail = await prisma.user.findFirst({ where: { email: dto.email }});
            if(validEmail) throw CustomError.badRequest("El email ya se encuentra registrado");
        }

        const update = await prisma.user.update({
            where: { id: dto.id },
            data: {
                email: dto.email ? dto.email : valid.email,
                name: dto.name ? dto.name : valid.name,
                password: dto.password ? HashAdapter.hash(dto.password) : valid.password,
                role: dto.role ? dto.role : valid.role,
                sedeId: dto.sedeId ? dto.sedeId : valid.sedeId,
            },
        });

        const { password, ...user } = UserEntity.fromObject(update);

        return {
            ...user,
        };
    } catch (error) {
        console.log(error)
        throw error;
    }
  }

  async delete(dto: DeleteUserDto) {
    try {
        const valid =  await prisma.user.findFirst({ where: { id: dto.id } });
        
        if(!valid) throw CustomError.notFound("El usuario no existe");
        if(valid.state === 'DELETE') throw CustomError.notFound("El usuario no existe");

        const update = await prisma.user.update({
            where: { id: dto.id },
            data: { state: "DELETE" }
        });

        const { password, ...user } = UserEntity.fromObject(update);

        return {
            ...user,
        };

    } catch (error) {
        throw error;
    }
  }

  async get(dto: GetUserDto) {
    try {
        const valid =  await prisma.user.findUnique({ 
            where: { id: dto.id },
            include: {
                sede: true
            } 
        });
        
        if(!valid) throw CustomError.notFound("El usuario no existe");
        if(valid.state === 'DELETE') throw CustomError.notFound("El usuario no existe");

        const { password, ...user } = UserEntity.fromObject(valid);

        return {
            ...user,
        };

    } catch (error) {
        throw error;
    }
  }
}
