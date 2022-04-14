const { nanoid } = require('nanoid');
const { books } = require('./books');

const addBooksHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (name === undefined) {
    const resp = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    resp.code(400);
    return resp;
  }

  if (readPage > pageCount) {
    const resp = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    resp.code(400);
    return resp;
  }

  const id = nanoid(16);
  const finished = (pageCount === readPage);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBooks);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const resp = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    resp.code(201);
    return resp;
  }

  const resp = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  resp.code(500);
  return resp;
};

const getAllBooksHandler = () => ({
  status: 'success',
  data: {
    books: books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    })),
  },
});

const getSpecBookHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((buku) => buku.id === bookId)[0];
  if (book !== undefined) {
    const resp = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    resp.code(200);
    return resp;
  }
  const resp = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  resp.code(404);
  return resp;
};

const updateBookHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  if (name === undefined) {
    const resp = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    resp.code(400);
    return resp;
  }
  if (readPage > pageCount) {
    const resp = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    resp.code(400);
    return resp;
  }
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const resp = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    resp.code(200);
    return resp;
  }
  const resp = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  resp.code(404);
  return resp;
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    const resp = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    resp.code(200);
    return resp;
  }
  const resp = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  resp.code(404);
  return resp;
};

module.exports = {
  addBooksHandler,
  getAllBooksHandler,
  getSpecBookHandler,
  updateBookHandler,
  deleteBookByIdHandler,
};
