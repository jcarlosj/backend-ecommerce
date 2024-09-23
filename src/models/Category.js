const { Schema, model } = require( 'mongoose' );

/** Definir la estructura de datos (nuestro documento) */
const CategorySchema = new Schema({
    name: {
        type: String,
        required: [ true, 'El nombre de la categoria es obligatoria' ],
        unique: [ true, 'La categoria ya esta registrada' ]
    },
    descripcion: String
}, {
    timestamps: true
});


const CategoryModel = model(
    'categories',       // Nombre de la coleccion
    CategorySchema      // Estructura de datos
);


module.exports = CategoryModel;