const { handleResponseSuccess, handleResponseError } = require("../helpers/handleResponses");
const { dbGetCategories, dbCreateCategory, dbGetCategoryById, dbRemoveCategoryById, dbUpdateCategoryById, dbGetPaginatedCategories, dbCountRecords } = require("../services/category.service");



const getCategories = async ( req, res ) => {

    try {
        const data = await dbGetCategories();
        
        handleResponseSuccess( res, 200, data );
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al obtener todas las categorias', error );
    }

}

const getCategoryById = async ( req, res ) => {
    const categoryId = req.params.id;

    try {
        const data = await dbGetCategoryById( categoryId );

        if( ! data ) {
            return handleResponseError( res, 404, 'Categoria no encontrada' );
        }

        handleResponseSuccess( res, 200, data );     
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al obtener una categoria por ID', error );
    }

}

const createCategory = async ( req, res ) => {
    const inputData = req.body;                     // Obteniendo los datos de la peticion

    try {
        const data = await dbCreateCategory( inputData );  
        
        handleResponseSuccess( res, 201, data );
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al crear la categoria nueva', error );
    }
    
}

const updateCategoryById = async ( req, res ) => {
    const categoryId = req.params.id;
    const inputData = req.body;

    try {
        const data = await dbUpdateCategoryById( categoryId, inputData );

        if( ! data ) {
            return handleResponseError( res, 404, 'Categoria no encontrada' );
        }

        handleResponseSuccess( res, 200, data );
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al actualizar parcialmente la categoria', error );
    }

}

const removeCategoryById = async ( req, res ) => {
    const categoryId = req.params.id;

    try {
        const data = await dbRemoveCategoryById( categoryId ); 
        
        if( ! data ) {
            return handleResponseError( res, 404, 'Categoria no encontrada' );
        }

        handleResponseSuccess( res, 200, data );
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al eliminar categoria por ID', error );
    }
    
}

const getPaginatedCategories = async ( req, res ) => {
    const page = parseInt( req.params.page ) ?? 1;
    const pageSize = parseInt( req.params.pageSize) ?? 10;

    try {
        const total = await dbCountRecords();
        const data =  await dbGetPaginatedCategories( page, pageSize );

        handleResponseSuccess( res, 200, { page, pageSize, data, total });
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al obtener las categorias', error );
    }

}


module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    removeCategoryById,
    getPaginatedCategories
}