import axios from 'axios';

const api = axios.create({
  baseURL: "https://library-book-borrowing-system-backend-production.up.railway.app"
});

export const getAllBooks = () => api.get('/book/all');
export const saveBook = (book) => api.post('/book/save', book);
export const updateBook = (book) => api.put('/book/update', book);
export const deleteBook = (id) => api.delete(`/book/delete/${id}`);
export const getBookById = (id) => api.get(`/book/id/${id}`);

export const getAllUsers = () => api.get('/user/all');
export const saveUser = (user) => api.post('/user/save', user);
export const updateUser = (user) => api.put('/user/update', user);
export const deleteUser = (id) => api.delete(`/user/delete/${id}`);
export const searchUsers = (term) => api.get(`/user/search/${term}`);

export const saveBorrow = (borrow) => api.post('/borrow/save', borrow);
export const getRenthistory = () => api.get('/borrow/all');
export const updateBorrowStatus = (updateData) => api.put('/borrow/update', updateData);
export const searchBorrows = (borrow) => api.get(`/borrow/search/${borrow}`);

export const login = (login) => api.post('/auth/login', login);