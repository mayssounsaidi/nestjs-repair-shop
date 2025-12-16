import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PartsModule } from './parts/parts.module';
import { User } from './users/user.entity';
import { SparePart } from './parts/spare-part.entity';
import { DevicesModule } from './devices/devices.module';
import { InterventionsModule } from './interventions/interventions.module';
import { Device } from './devices/devices.entity';
import { Intervention} from './interventions/interventions.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // permet d'utiliser process.env partout
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306, // valeur par défaut si undefined
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, SparePart,Device, Intervention],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      logging: process.env.TYPEORM_LOGGING === 'true',
    }),
    UsersModule,
    AuthModule,
    PartsModule,
    DevicesModule,
    InterventionsModule,
  ],
})
export class AppModule {}
