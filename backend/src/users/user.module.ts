import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/users.controller";
import { PrismaService } from "./services/prisma.service";
import { UsersService } from "./services/users.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UserModule {}
