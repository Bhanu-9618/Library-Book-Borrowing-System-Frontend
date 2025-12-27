import axios from 'axios';

const BASE_URL = "http://localhost:8080";

export const getAllBooks = () => axios.get(`${BASE_URL}/book/all`);
export const saveBook = (book) => axios.post(`${BASE_URL}/book/save`, book);
export const updateBook = (book) => axios.put(`${BASE_URL}/book/update`, book);
export const deleteBook = (id) => axios.delete(`${BASE_URL}/book/delete/${id}`);
export const getBookById = (id) => axios.get(`${BASE_URL}/book/id/${id}`);

export const getAllUsers = () => axios.get(`${BASE_URL}/user/all`);
export const saveUser = (user) => axios.post(`${BASE_URL}/user/save`, user);

export const saveBorrow = (borrow) => axios.post(`${BASE_URL}/borrow/save`, borrow);
export const getRenthistory = () => axios.get(`${BASE_URL}/borrow/all`);
export const updateBorrowStatus = (updateData) => axios.put(`${BASE_URL}/borrow/update`, updateData);