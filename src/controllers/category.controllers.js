const { handleResponseSuccess, handleResponseError } = require("../helpers/handleResponses");
const { dbGetCategories } = require("../services/category.service");

const getCategories = async ( req, res ) => {

    try {
        const data = await dbGetCategories();
        
        handleResponseSuccess( res, 200, data );
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al obtener todas las categorias', error );
    }

}

const getCategoryById = ( req, res ) => {
    res.json({
        ok: true,
        msg: 'Obtiene una categoria por ID'
    });
}

const createCategory = ( req, res ) => {
    res.json({
        ok: true,
        msg: 'Crea una categoria nueva'
    });
}

const updateCategoryById = ( req, res ) => {
    res.json({
        ok: true,
        msg: 'Actualiza una categoria por ID'
    });
}

const removeCategoryById = ( req, res ) => {
    res.json({
        ok: true,
        msg: 'Elimina un producto por ID'
    });
}


module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    removeCategoryById
}