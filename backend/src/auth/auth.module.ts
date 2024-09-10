import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/users/user.module";
import { AuthController } from "./controllers/auth.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtAuthGuard } from "src/auth/services/jwtguard.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        return {
          secret,
          signOptions: { expiresIn: '60m' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtAuthGuard],
  exports: [AuthService,JwtAuthGuard],
})
export class AuthModule {}
