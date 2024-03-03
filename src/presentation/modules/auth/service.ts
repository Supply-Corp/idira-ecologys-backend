import { HashAdapter, JwtAdapter, prisma } from "../../../configuration";
import { CustomError, LoginDto, UserEntity } from "../../../domain";

export class AuthService {
    async login(dto: LoginDto) {
        const { email, password: nPassword } = dto;

        const find = await prisma.user.findFirst({ where: { email } });
        if (!find) throw CustomError.badRequest("Email o contraseña invalida");

        const compare = HashAdapter.compare(nPassword, find.password);
        if (!compare) throw CustomError.badRequest("contraseña inválida");

        const { password, ...user } = UserEntity.fromObject(find);

        const token = await JwtAdapter.generateToken({ id: user.id });
        if (!token) throw CustomError.internalServe("Error al generar el token");

        return {
        user,
        token,
        };
    }
}
