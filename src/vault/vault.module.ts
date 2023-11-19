import { Global, Module } from '@nestjs/common';
import { VaultService } from './vault.service';

@Global()
@Module({
  providers: [VaultService],
  exports: [VaultService],
})
export class VaultModule {}
