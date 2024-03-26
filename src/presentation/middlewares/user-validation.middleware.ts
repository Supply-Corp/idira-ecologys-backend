import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../configuration/database/index';
import { Roles, States, UserEntity } from '../../domain';
import { JwtAdapter } from '../../configuration';

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

    static state (value: any): States {
        const state: States = value;
    
        if (!(state in States)) throw new Error("El Estado no es válido");
        
        return state;
    }
    
    static async sede (value: any) {
        const valid = await prisma.sedes.findFirst({ where: { id: +value } });
        if( !valid ) throw new Error("Sede no existe");
        if( valid.state === "DELETE") throw new Error("Sede no existe");
        
        return true;
    }

    static async auth (req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization');

        if( !authorization ) return res.status(401).json({ error: 'Token not provided.' });
        if( !authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token'});

        const token = authorization.split(' ').at(1) || '';

        try {
            const payload = await JwtAdapter.validateToken<{ id: string }>( token );
            if( !payload ) return res.status(401).json({ error: 'Invalid token' });

            const user = await prisma.user.findFirst({ 
                where: { id: +payload.id }, 
                include: { sede: true }
            });
            if( !user ) return res.status(401).json({ error: 'Error token validation information.'});

            const { password, ...auth } = UserEntity.fromObject( user );
            req.body.user = auth;

            next();
        } catch (error) {
            console.error( error );
            return res.status(500).json({ error: 'Internal server error.'});
        }
    }
}