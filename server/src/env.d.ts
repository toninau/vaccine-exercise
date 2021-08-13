declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DATABASE_URL: string;
    TEST_DATABASE_URL: string;
    NODE_ENV: string;
  }
}