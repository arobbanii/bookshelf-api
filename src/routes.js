const {
    addBooksHandler,
    getAllBooksHandler,
    getSpecBookHandler,
    updateBookHandler,
    deleteBookByIdHandler,
} = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooksHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getSpecBookHandler,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookByIdHandler,
    },
];

module.exports = routes;