"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    app.use(session({
        secret: process.env.SESSION_SECRET || 'mi_secreto_de_sesion',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 60,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        }
    }));
    app.enableCors({
        origin: 'http://localhost:4200',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true,
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    logger.log(`Aplicación corriendo en: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map