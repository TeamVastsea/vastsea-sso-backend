import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '../jwt.service';
import { JwtModuleOptions, MODULE_OPTIONS_TOKEN } from '../jwt.options';

const pri = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDCFg4UrY5xtulv
/NXKmL1J4qI1SopAfTNMo3X7p+kJO7plqUYjzaztcre1qfh0m33Sm1Q8oPbO/GpP
MU1/HgcceytgJ/b4UwufVVMl9BrMDYG8moDBylbVupFQS3Ly1L9i/iFG9Z9A9xzY
Zzf799A45bnvNXL6s2glzvjiRvfQ2NDF0anTcnZLcYtC7ugq1IMM+ihAcPfw8Qw2
chN/SmP4qAM+PKaQwagmU7doqmmyN9u38AfoYZ1GCFhEs5TBBT6H6h9YdHeVtiIq
1c+fl03biSIfLrV7dUBD39gBmXBcL/30Ya3D82mCEUC4zg/UkOfQOmkmV3Lc8YUL
QZ8EJkBLAgMBAAECggEAVuVE/KEP6323WjpbBdAIv7HGahGrgGANvbxZsIhm34ls
VOPK0XDegZkhAybMZHjRhp+gwVxX5ChC+J3cUpOBH5FNxElgW6HizD2Jcq6t6LoL
YgPSrfEHm71iHg8JsgrqfUnGYFzMJmv88C6WdCtpgG/qJV1K00/Ly1G1QKoBffEs
+v4fAMJrCbUdCz1qWto+PU+HLMEo+krfEpGgcmtZeRlDADh8cETMQlgQfQX2VWq/
aAP4a1SXmo+j0cvRU4W5Fj0RVwNesIpetX2ZFz4p/JmB5sWFEj/fC7h5z2lq+6Bm
e2T3BHtXkIxoBW0/pYVnASC8P2puO5FnVxDmWuHDYQKBgQDTuuBd3+0tSFVEX+DU
5qpFmHm5nyGItZRJTS+71yg5pBxq1KqNCUjAtbxR0q//fwauakh+BwRVCPOrqsUG
jBSb3NYE70Srp6elqxgkE54PwQx4Mr6exJPnseM9U4K+hULllf5yjM9edreJE1nV
NVgFjeyafQhrHKwgr7PERJ/ikwKBgQDqqsT1M+EJLmI1HtCspOG6cu7q3gf/wKRh
E8tu84i3YyBnI8uJkKy92RNVI5fvpBARe3tjSdM25rr2rcrcmF/5g6Q9ImxZPGCt
86eOgO9ErNtbc4TEgybsP319UE4O41aKeNiBTAZKoYCxv/dMqG0j4avmWzd+foHq
gSNUvR2maQKBgQCYeqOsV2B6VPY7KIVFLd0AA9/dwvEmgAYLiA/RShDI+hwQ/5jX
uxDu37KAhqeC65sHLrmIMUt4Zdr+DRyZK3aIDNEAesPMjw/X6lCXYp1ZISD2yyym
MFGH8X8CIkstI9Faf9vf6PJKSFrC1/HA7wq17VCwrUzLvrljTMW8meM/CwKBgCpo
2leGHLFQFKeM/iF1WuYbR1pi7gcmhY6VyTowARFDdOOu8GXYI5/bz0afvCGvAMho
DJCREv7lC/zww6zCTPYG+HOj+PjXlJFba3ixjIxYwPvyEJiDK1Ge18sB7Fl8dHNq
C5ayaqCqN1voWYUdGzxU2IA1E/5kVo5O8FesJeOhAoGBAImJbZFf+D5kA32Xxhac
59lLWBCsocvvbd1cvDMNlRywAAyhsCb1SuX4nEAK9mrSBdfmoF2Nm3eilfsOds0f
K5mX069IKG82CMqh3Mzptd7e7lyb9lsoGO0BAtjho3cWtha/UZ70vfaMzGuZ6JmQ
ak6k+8+UFd93M4z0Qo74OhXB
-----END PRIVATE KEY-----`;

const pub = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwhYOFK2Ocbbpb/zVypi9
SeKiNUqKQH0zTKN1+6fpCTu6ZalGI82s7XK3tan4dJt90ptUPKD2zvxqTzFNfx4H
HHsrYCf2+FMLn1VTJfQazA2BvJqAwcpW1bqRUEty8tS/Yv4hRvWfQPcc2Gc3+/fQ
OOW57zVy+rNoJc744kb30NjQxdGp03J2S3GLQu7oKtSDDPooQHD38PEMNnITf0pj
+KgDPjymkMGoJlO3aKppsjfbt/AH6GGdRghYRLOUwQU+h+ofWHR3lbYiKtXPn5dN
24kiHy61e3VAQ9/YAZlwXC/99GGtw/NpghFAuM4P1JDn0DppJldy3PGFC0GfBCZA
SwIDAQAB
-----END PUBLIC KEY-----`;

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: {
            alg: 'RS256',
            privateKey: pri,
            publicKey: pub,
          } as JwtModuleOptions,
        },
      ],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should sign a payload and return a valid JWT', async () => {
    const payload = { userId: '12345', role: 'admin' };
    const token = await service.sign({
      payload,
      issuer: 'test-issuer',
      audience: 'test-audience',
      expire: Math.floor(Date.now() / 1000) + 60, // 1 minute expiration
    });

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('should verify a valid JWT and return the payload', async () => {
    const payload = { userId: '12345', role: 'admin' };
    const token = await service.sign({
      payload,
      issuer: 'test-issuer',
      audience: 'test-audience',
      expire: Math.floor(Date.now() / 1000) + 60, // 1 minute expiration
    });

    const result = await service.verify(token);

    expect(result).toBeDefined();
    expect(result.payload).toMatchObject(payload);
    expect(result.payload.iss).toBe('test-issuer');
    expect(result.payload.aud).toBe('test-audience');
  });

  it('should throw an error for an invalid JWT', async () => {
    const invalidToken = 'invalid.token.value';

    await expect(service.verify(invalidToken)).rejects.toThrow();
  });

  it('should throw an error for an expired JWT', async () => {
    const payload = { userId: '12345', role: 'admin' };
    const token = await service.sign({
      payload,
      expire: Math.floor(Date.now() / 1000) - 10, // Expired 10 seconds ago
    });

    await expect(service.verify(token)).rejects.toThrow();
  });
  it('should sign a payload with all options and return a valid JWT', async () => {
    const payload = { userId: '12345', role: 'admin' };
    const options = {
      payload,
      issuer: 'test-issuer',
      subject: 'test-subject',
      audience: ['test-audience'],
      expire: Math.floor(Date.now() / 1000) + 120, // 2 minutes expiration
      issueAt: Math.floor(Date.now() / 1000),
      notBefore: Math.floor(Date.now() / 1000) + 10, // Valid after 10 seconds
      jti: 'unique-id',
    };

    const token = await service.sign(options);

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('should sign a payload with minimal options and return a valid JWT', async () => {
    const payload = { userId: '67890', role: 'user' };
    const options = { payload };

    const token = await service.sign(options);

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });
});
