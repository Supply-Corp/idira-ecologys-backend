import { prisma } from "../../../configuration";
import { CreateCompanyDto, CustomError } from "../../../domain";

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
        email_supervisor
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
    if( !company ) throw CustomError.badRequest('Error al crear la empresa');

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
      msg: 'Empresa registrada con éxito'
    };
  }

}