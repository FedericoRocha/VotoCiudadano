import { Connection } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserRole, UserSchema } from '../users/user.entity';

export async function createAdminUser(connection: Connection) {
  try {
    // Asegurarse de que el modelo User esté registrado
    let UserModel;
    if (connection.models['User']) {
      UserModel = connection.model<User>('User');
    } else {
      UserModel = connection.model<User>('User', UserSchema);
    }
    
    // Verificar si ya existe un admin
    const adminExists = await UserModel.findOne({ username: 'admin' }).exec();
    
    if (!adminExists) {
      const admin = new UserModel({
        username: 'admin',
        password: await bcrypt.hash('admin123', 10),
        role: UserRole.ADMIN
      });
      
      await admin.save();
      console.log('Usuario admin creado con éxito');
    } else {
      console.log('El usuario admin ya existe');
    }
  } catch (error) {
    console.error('Error al crear el usuario admin:', error);
    throw error;
  }
}

export default createAdminUser;
