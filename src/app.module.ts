import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VaultModule } from './vault/vault.module';

@Module({
  imports: [AuthModule, UsersModule, VaultModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
