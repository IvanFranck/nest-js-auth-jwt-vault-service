import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalSrategy } from './strategies/local.strategy';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { VaultService } from 'src/vault/vault.service';
import { jwtConstant } from './constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (
        vaultService: VaultService,
      ): Promise<JwtModuleOptions> => ({
        secret: await vaultService.getSecret(),
        privateKey: await vaultService.getSecret(),
        publicKey: jwtConstant.publicKey,
        signOptions: {
          algorithm: 'RS512',
          expiresIn: '2m',
        },
      }),
      inject: [VaultService],
    }),
  ],
  providers: [AuthService, LocalSrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
