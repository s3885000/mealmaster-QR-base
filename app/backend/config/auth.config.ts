import * as dotenv from "dotenv";
dotenv.config();

export default () => ({
    jwtSecret: process.env.JWT_SECRET || 'my-secret-key',
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || '7d',
    refresh_tokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
    jwtModuleExpiration: process.env.JWT_MODULE_EXPIRATION || '7d',
});
