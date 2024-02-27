import { prisma } from "../../../configuration";
import { CompanyEntity, CreateCompanyDto, CustomError, DeleteCompanyDto, GetCompanyDto, PaginationDto, PaginationGenerate, UpdateCompanyDto } from "../../../domain";

export class CompanyService {
  async create(dto: CreateCompanyDto) {
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
    } = dto;

    const company = await prisma.company.create({
      data: {
        name,
        email,
        razon_social,
        ruc,
        distrito,
        provincia,
        address,
      },
    });
    if (!company) throw CustomError.badRequest("Error al crear la empresa");

    await prisma.representative.create({
      data: {
        name: name_representative,
        dni: dni_representative,
        email: email_representative ? email_representative : null,
        companyId: company.id,
      },
    });

    await prisma.generalManager.create({
      data: {
        name: name_general_manager,
        dni: dni_general_manager,
        email: email_general_manager ? email_general_manager : null,
        companyId: company.id,
      },
    });

    await prisma.supervisor.create({
      data: {
        name: name_supervisor,
        dni: dni_supervisor,
        email: email_supervisor ? email_supervisor : null,
        companyId: company.id,
      },
    });

    return {
      ...company,
    };
  }

  async update(dto: UpdateCompanyDto) {
    const {
      id,
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
    } = dto;

    const find = await prisma.company.findFirst({ where: { id } });
    if (!find) throw CustomError.notFound(`No existe la empresa ${id}`);

    if( find.state === 'DELETE') throw CustomError.notFound(`No existe la empresa ${id}`);

    const companyUpdate = await prisma.company.update({
      where: { id },
      data: {
        name: name ? name : find.name,
        email: email ? email : find.email,
        razon_social: razon_social ? razon_social : find.razon_social,
        ruc: ruc ? ruc : find.ruc,
        distrito: distrito ? distrito : find.distrito,
        provincia: provincia ? provincia : find.provincia,
        address: address ? address : find.address,
      },
    });
    if (!companyUpdate)throw CustomError.badRequest("Error al actualizar empresa");

    const representative = await prisma.representative.findFirst({
      where: { companyId: id },
    });
    if (representative) {
      await prisma.representative.update({
        where: { id: representative.id },
        data: {
          name: name_representative ? name_representative : representative.name,
          dni: dni_representative ? dni_representative : representative.dni,
          email: email_representative
            ? email_representative
            : representative.email,
        },
      });
    }

    const manager = await prisma.generalManager.findFirst({
      where: { companyId: id },
    });
    if (manager) {
      await prisma.generalManager.update({
        where: { id: manager.id },
        data: {
          name: name_general_manager ? name_general_manager : manager.name,
          dni: dni_general_manager ? dni_general_manager : manager.dni,
          email: email_general_manager ? email_general_manager : manager.email,
        },
      });
    }

    const supervisor = await prisma.supervisor.findFirst({
      where: { companyId: id },
    });
    if (supervisor) {
      await prisma.supervisor.update({
        where: { id: supervisor.id },
        data: {
          name: name_supervisor ? name_supervisor : supervisor.name,
          dni: dni_supervisor ? dni_supervisor : supervisor.dni,
          email: email_supervisor ? email_supervisor : supervisor.email,
        },
      });
    }

    return {
      ...companyUpdate,
    };
  }

  async delete(dto: DeleteCompanyDto) {
    const id = dto.id;

    const find = await prisma.company.findFirst({ where: { id } });
    if (!find) throw CustomError.notFound(`No existe la empresa ${id}`);

    if( find.state === 'DELETE') throw CustomError.notFound(`No existe la empresa ${id}`);

    const deleted = await prisma.company.update({
      where: { id },
      data: {
        state: "DELETE",
      },
    });

    return {
      ...deleted,
    };
  }

  async get(dto: GetCompanyDto) {
    const id = dto.id;

    const find = await prisma.company.findFirst({ 
      where: { id },
      include: {
        Representative: true,
        GeneralManager: true,
        Supervisor: true
      } 
    });

    if (!find) throw CustomError.notFound(`No existe la empresa ${id}`);

    if( find.state === 'DELETE') throw CustomError.notFound(`No existe la empresa ${id}`);

    return {
      ...find
    }
    
  }

  async list(dto: PaginationDto) {
    
    const { page, limit, search } = dto;

    const [ results, total ] = await Promise.all([
      prisma.company.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          state: 'ACTIVE',
          name: {
            startsWith: `%${search}%`,
          }
        },
        include: {
          Representative: true,
          GeneralManager: true,
          Supervisor: true
        },
        orderBy: { id: 'desc' }
      }),
      prisma.company.count({
        where: {
          state: 'ACTIVE',
          name: {
            startsWith: `%${search}%`,
          },
        },
      })
    ]);

    const data = results.map( CompanyEntity.fromObject );

    const pagination = PaginationGenerate.create({
      page, 
      limit, 
      total, 
      search, 
      url: 'company', 
      results: data
    });

    return {
      ...pagination
    };
  }
}