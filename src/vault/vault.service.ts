import { Injectable } from '@nestjs/common';
import NodeVault, * as vault from 'node-vault';
import { vaultConstants } from 'src/auth/constants';

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

  constructor() {
    this.client = vault({
      apiVersion: 'v1',
      endpoint: 'http://127.0.0.1:8200',
      token: vaultConstants.token,
    });
  }

  async getSecret(): Promise<string> {
    const secretRespponse: JwtSecretKeyResponse =
      await this.client.read('kv-v1/keys/jwt');
    return secretRespponse.data.key;
  }
}
