import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../config.service';
import { ConfigOption, MODULE_OPTIONS_TOKEN } from '../config.options';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: {
            loader: () => {
              return Promise.resolve({
                url: 'http://example.org',
              });
            },
          } as ConfigOption,
        },
      ],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return string', () => {
    void expect(service.get('url')).resolves.toBe('http://example.org');
  });
  it('should return null', () => {
    void expect(service.get('not found' as any)).resolves.toBeUndefined();
  });
});
