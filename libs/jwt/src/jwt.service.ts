import { Inject, Injectable } from '@nestjs/common';
import { JwtModuleOptions, MODULE_OPTIONS_TOKEN } from './jwt.options';
import {
  importPKCS8,
  importSPKI,
  JWTPayload,
  jwtVerify,
  KeyObject,
  SignJWT,
} from '@gaonengwww/jose';

export type SignOptions<T extends JWTPayload> = {
  payload: T;
  issuer?: string;
  subject?: string;
  audience?: string | string[];
  expire?: number;
  issueAt?: number;
  notBefore?: number;
  jti?: string;
};
export type SelectItem = 'payload' | 'header';

@Injectable()
export class JwtService {
  private priKey: Promise<KeyObject>;
  private pubKey: Promise<KeyObject>;
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private config: JwtModuleOptions) {
    this.priKey = importPKCS8(config.privateKey, config.alg);
    this.pubKey = importSPKI(config.publicKey, config.alg);
  }
  sign<T extends JWTPayload>(options: SignOptions<T>) {
    const sign = new SignJWT(options.payload);
    const issuerAt = options.issueAt ?? new Date();
    if (options.audience) {
      sign.setAudience(options.audience);
    }
    if (options.expire) {
      sign.setExpirationTime(options.expire);
    }
    if (issuerAt !== undefined) {
      sign.setIssuedAt(issuerAt);
    }
    if (options.notBefore) {
      sign.setNotBefore(options.notBefore);
    }
    if (options.issuer) {
      sign.setIssuer(options.issuer);
    }
    if (options.subject) {
      sign.setSubject(options.subject);
    }
    if (options.jti) {
      sign.setJti(options.jti);
    }
    return this.priKey.then((key) => {
      return sign
        .setProtectedHeader({
          alg: this.config.alg,
        })
        .sign(key)
        .then((value) => value);
    });
  }
  verify(token: string) {
    return this.pubKey.then((key) => {
      return jwtVerify(token, key);
    });
  }
}
