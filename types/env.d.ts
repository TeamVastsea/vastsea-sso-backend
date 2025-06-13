declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    NODE_ENV: 'dev' | 'prod';
    BASE_PATH: string;
    REDIS: string;
  }
}
