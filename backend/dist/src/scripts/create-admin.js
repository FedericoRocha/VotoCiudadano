"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminUser = createAdminUser;
const bcrypt = require("bcryptjs");
const user_entity_1 = require("../users/user.entity");
async function createAdminUser(connection) {
    try {
        let UserModel;
        if (connection.models['User']) {
            UserModel = connection.model('User');
        }
        else {
            UserModel = connection.model('User', user_entity_1.UserSchema);
        }
        const adminExists = await UserModel.findOne({ username: 'admin' }).exec();
        if (!adminExists) {
            const admin = new UserModel({
                username: 'admin',
                password: await bcrypt.hash('admin123', 10),
                role: user_entity_1.UserRole.ADMIN
            });
            await admin.save();
            console.log('Usuario admin creado con éxito');
        }
        else {
            console.log('El usuario admin ya existe');
        }
    }
    catch (error) {
        console.error('Error al crear el usuario admin:', error);
        throw error;
    }
}
exports.default = createAdminUser;
//# sourceMappingURL=create-admin.js.map