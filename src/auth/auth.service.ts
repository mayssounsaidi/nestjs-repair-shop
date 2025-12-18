import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../common/enums'; // chemin relatif correct
import { User } from '../users/user.entity';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Méthode pour créer un utilisateur
  async register(
    userData: { email: string; username: string; password: string; role?: Role },
    creatorRole?: Role,
  ): Promise<User> {
    // Vérification si on essaye de créer un admin
    if (userData.role === Role.ADMIN && creatorRole !== Role.ADMIN) {
      throw new ForbiddenException('Only admins can create another admin');
    }

    // Vérification obligatoire du mot de passe
    if (!userData.password) {
      throw new ForbiddenException('Password is required');
    }

    // Hash du mot de passe
    userData.password = await bcrypt.hash(userData.password, 10);

    // Par défaut, rôle TECH
    if (!userData.role) userData.role = Role.TECH;

    return this.usersService.create(userData);
  }

  // Valide les credentials pour login
  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  // Login et génération du JWT
  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.validateUser(email, password);

    const payload = { sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload); // secret est défini dans JwtModule

   return { access_token: token };


  }
}

