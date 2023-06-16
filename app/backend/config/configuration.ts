import databaseConfig from "./database.config";
import authConfig from "./auth.config";


export default () => ({
    database: databaseConfig(),
    auth: authConfig(),
})