const CategoryModel = require("../models/Category");
const { dbGetPaginatedProducts } = require("./products.service");


async function dbGetCategories () {
    return await CategoryModel.find({});
}

async function dbCreateCategory( newCategory ) {
    return await CategoryModel.create( newCategory );
}

async function dbGetCategoryById( id ) {
    return await CategoryModel.findOne({ _id: id });
}

async function dbRemoveCategoryById( id ) {
    return await CategoryModel.findByIdAndDelete( id );
}

async function dbUpdateCategoryById( id, updateCategory ) {
    return await CategoryModel.findByIdAndUpdate(
        id,
        { $set: updateCategory },
        { new: true }
    );
}

async function dbGetPaginatedCategories( page, pageSize, filter = {} ) {
    return await CategoryModel.find( filter )
        .skip( ( page - 1 ) * pageSize )
        .limit( pageSize )
        .sort({ createAt: -1 });

}


async function dbCountRecords( filter = {} ) {
    return await CategoryModel.countDocuments( filter );
}


module.exports = {
    dbGetCategories,
    dbCreateCategory,
    dbGetCategoryById,
    dbRemoveCategoryById,
    dbUpdateCategoryById,
    dbGetPaginatedCategories,
    dbCountRecords
}