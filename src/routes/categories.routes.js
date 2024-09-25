const { Router } = require( 'express' );
const { getCategories, getCategoryById, createCategory, removeCategoryById, updateCategoryById, getPaginatedCategories } = require('../controllers/category.controllers');
const { authUser } = require('../middlewares/auth-user.middleware');
const router = Router();

/** Definir todas las rutas de la API para la data de categorias */
// http://localhost:3000/api/categories
router.post( '/', authUser, createCategory );             // Crear una categoria

router.get( '/', getCategories );               // Obtener todas las categorias
router.get( '/:id', getCategoryById );          // Obtener una categoria por ID
router.patch( '/:id', authUser, updateCategoryById );     // Actualizar una categoria parcialmente
router.delete( '/:id', authUser, removeCategoryById );    // Eliminar una categoria por ID

router.get( '/:page?/:pageSize?', getPaginatedCategories );     // Obtener todos los categorias paginados


module.exports = router;