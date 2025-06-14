declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    NODE_ENV: 'dev' | 'prod';
    BASE_PATH: string;
    SSO_PATH: string;
    REDIS: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    grant_type: string;
  }
}
