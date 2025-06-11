import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PartidosModule } from './partidos/partidos.module';
import { VotosModule } from './votos/votos.module';
import { UbicacionesModule } from './ubicaciones/ubicaciones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI', 'mongodb://localhost:27017/votociudadano'),
      }),
      inject: [ConfigService],
    }),
    PartidosModule,
    VotosModule,
    AuthModule,
    UsersModule,
    UbicacionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
