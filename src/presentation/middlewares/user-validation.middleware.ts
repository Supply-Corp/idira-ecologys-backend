import { prisma } from '../../configuration/database/index';
import { Roles } from '../../domain';

export class UserValidationMiddleware {

    static async email (value: any) {
        const valid = await prisma.user.findFirst({ where: { email: value } });
        if( valid ) throw new Error("Email ya se encuentra registrado");
        return true;
    }

    static role (value: any): Roles {
        const rol: Roles = value;
    
        if (!(rol in Roles)) throw new Error("El Rol no es válido");
        
        return rol;
    }
    
    static async sede (value: any) {
        const valid = await prisma.sedes.findFirst({ where: { id: +value } });
        if( !valid ) throw new Error("Sede no existe");
        if( valid.state === "DELETE") throw new Error("Sede no existe");
        
        return true;
    }
}