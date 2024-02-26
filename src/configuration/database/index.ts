import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export class PrismaConnection {

    static async client() {
        try {
            await prisma.$connect();
            console.log(`database connected`);
        } catch (error) {
            console.log(`error database connection ${ error }`);
        }
    }

}