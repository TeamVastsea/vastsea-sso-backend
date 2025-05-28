import { join } from 'path';
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'fs';
import { generateKeyPairSync } from 'crypto';

const root = join(__dirname, '../');

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

if (!existsSync(join(root, 'keys'))) {
  mkdirSync(join(root, 'keys'));
}

const children = readdirSync(join(root, 'keys'));
if (children.includes('pri.pkcs8')) {
  console.log('Private Key Exists');
} else {
  writeFileSync(join(root, 'keys', 'pri.pkcs8'), privateKey.toString());
  console.log('Write private key success');
}
if (children.includes('pub.pem')) {
  console.log('Public Key Exists');
} else {
  writeFileSync(join(root, 'keys', 'pub.pem'), publicKey.toString());
  console.log('Write public key success');
}
