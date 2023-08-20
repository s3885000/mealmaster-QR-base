

const config = {
    jwtSecret: process.env.JWT_SECRET || 'my-secret-key',
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || '1d',
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '1d',
    jwtModuleExpiration: process.env.JWT_MODULE_EXPIRATION || '7d',
    stripePublicKey: process.env.STRIPE_PUBLISHABLE_KEY || 'stripe-public-key',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || 'stripe-secret-key',
}
export default () => config;