import * as fs from 'fs';
const publicKey = fs.readFileSync('public_key.pem', 'utf8');

export const jwtConstant = {
  publicKey,
};

export const vaultConstants = {
  token:
    'hvs.CAESICji2hERZhncaj4RSY2Ul2xXX3B6qB2jJOG66dRsEdJWGh4KHGh2cy4zZEc2NmRLZmJTSHJ2Z3EwektFUlBCclY',
};
