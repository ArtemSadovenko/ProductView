import axios from 'axios';
import { ProductType } from './redux/product/types'; 
import { BlankCommentType, CommentType } from './redux/comment/types';
import { Start } from '@mui/icons-material';
const START_URL = "http://localhost:8080/api" 

const PRODUCT_API_URL =  START_URL + '/product';


export const getAllProducts = async (): Promise<ProductType[]> => {
  try {
    const response = await axios.get(`${PRODUCT_API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export const getProductById = async (id: number): Promise<ProductType> => {
  try {
    const response = await axios.get(`${PRODUCT_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

export const createProduct = async (product: ProductType): Promise<void> => {
  try {
    await axios.post(`${PRODUCT_API_URL}/create`, product);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const addComment = async (productId: number, comment: BlankCommentType) => {
  try {
    // Make the POST request
    const response = await axios.post(`${PRODUCT_API_URL}/comment/${productId}`, comment);
    console.log('Comment added successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error; // or handle it as needed
  }
};


export const updateProduct = async (product: ProductType): Promise<void> => {
  try {
    await axios.put(`${PRODUCT_API_URL}/update`, product);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${PRODUCT_API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// ------------------------------------------------------------------------

const COMMENT_API_URL = START_URL +'/comment';

export const getAllComments = async (): Promise<CommentType[]> => {
  try {
    const response = await axios.get(`${COMMENT_API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const getCommentById = async (id: number): Promise<CommentType> => {
  try {
    const response = await axios.get(`${COMMENT_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comment by ID:', error);
    throw error;
  }
};

export const createComment = async (comment: CommentType): Promise<void> => {
  try {
    await axios.post(`${COMMENT_API_URL}/create`, comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const updateComment = async (comment: CommentType): Promise<void> => {
  try {
    await axios.put(`${COMMENT_API_URL}/update`, comment);
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

export const deleteComment = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${COMMENT_API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
