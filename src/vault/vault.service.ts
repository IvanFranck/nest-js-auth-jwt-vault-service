import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import NodeVault, * as vault from 'node-vault';

type JwtSecretKeyResponse = {
  request_id: string;
  lease_id: string;
  renewable: boolean;
  lease_duration: number;
  data: {
    key: string;
  };
  wrap_info: any;
  warnings: any;
  auth: any;
};

@Injectable()
export class VaultService {
  private readonly client: NodeVault.client;

  constructor(configService: ConfigService) {
    this.client = vault({
      apiVersion: 'v1',
      endpoint: configService.get<string>('VAULT_ADDR'),
      token: configService.get<string>('VAULT_TOKEN'),
    });
  }

  async getSecret(): Promise<string> {
    const secretRespponse: JwtSecretKeyResponse =
      await this.client.read('kv-v1/keys/jwt');
    return secretRespponse.data.key;
  }
}
