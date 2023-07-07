import * as dotenv from "dotenv";
dotenv.config();

export default () => ({
    jwtSecret: process.env.JWT_SECRET || 'my-secret-key',
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || '1d',
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '1d',
    jwtModuleExpiration: process.env.JWT_MODULE_EXPIRATION || '7d',
});
