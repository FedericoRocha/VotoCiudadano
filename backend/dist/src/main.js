"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
const create_admin_1 = require("./scripts/create-admin");
const user_entity_1 = require("./users/user.entity");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('VotoCiudadano API')
        .setDescription('API para el sistema de votación ciudadana')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    try {
        const connection = await (0, mongoose_1.connect)(process.env.MONGODB_URI || 'mongodb://localhost:27017/votociudadano');
        if (!connection.models['User']) {
            connection.model('User', user_entity_1.UserSchema);
        }
        await (0, create_admin_1.createAdminUser)(connection);
        console.log('Aplicación iniciada correctamente');
    }
    catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Aplicación escuchando en el puerto ${process.env.PORT ?? 3000}`);
}
bootstrap().catch(err => {
    console.error('Error al iniciar la aplicación:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map