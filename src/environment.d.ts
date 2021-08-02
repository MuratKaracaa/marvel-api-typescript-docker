declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PUBLIC_KEY: string;
            PRIVATE_KEY: string;
            PORT?: number;
        }
    }
}

export { __global }