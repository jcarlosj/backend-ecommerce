const { genSaltSync, hashSync } = require( 'bcrypt' );
const UserModel = require("../models/User");
const { encryptedPassword } = require('../helpers/bcrypt.helper');

const dbGetUserByUsername = async ( email ) => {

    return await UserModel.findOne(
        { username: email }, 
        { createdAt: 0, updatedAt: 0 }      // Indicamos que campos deseamos que sean excluidos del objeto de respuesta del query
    );
}

const registerUser = async ( newUser ) => {

    console.log( 'Data Pura: ', newUser );

    // Paso 1: Creamos un objecto (dbUser) de la clase UserModel y le pasamos la data pura
    const dbUser = new UserModel( newUser );
    console.log( 'Data procesada por la clase UserModel: ', dbUser );

    // Paso 2: Encriptar la contraseña
    const hashPassword = encryptedPassword( newUser.password );

    dbUser.password = hashPassword;        // Actualizando la propiedad 'password' en el objeto (dbUser)
    console.log( 'Data procesada por la clase UserModel: ', dbUser );

    // Paso 3: Guarda en la Base de datos y retorna los datos del documento registrado
    const bjsonUser = await dbUser.save();           

    // Paso 4: Convertir un BJSON en un Objeto de JavaScript
    const objUser = bjsonUser.toObject();

    // Paso 5: Eliminar las propiedades que no deseo que obtenga el cliente
    delete objUser.createdAt;
    delete objUser.updatedAt;
    delete objUser.password;

    return objUser;
}


module.exports = {
    dbGetUserByUsername,
    registerUser
};