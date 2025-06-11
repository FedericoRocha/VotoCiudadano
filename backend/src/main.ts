import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Connection, connect, Model } from 'mongoose';
import { createAdminUser } from './scripts/create-admin';
import { User, UserSchema } from './users/user.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS
  app.enableCors();
  
  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('VotoCiudadano API')
    .setDescription('API para el sistema de votación ciudadana')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Configurar conexión a MongoDB y crear usuario admin
  try {
    const connection = await connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/votociudadano');
    
    // Registrar el modelo de Usuario si no existe
    if (!connection.models['User']) {
      connection.model('User', UserSchema);
    }
    
    // Crear usuario admin
    await createAdminUser(connection as unknown as Connection);
    console.log('Aplicación iniciada correctamente');
  } catch (error) {
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
