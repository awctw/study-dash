import axios from "axios";

const API_TODO_ITEMS_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api/TODOList"
    : "https://studyDash-server.onrender.com/api/TODOList";
const API_CATEGORIES_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api/TODOList"
    : "https://studyDash-server.onrender.com/api/categories";

const getCategories = async (userID) => {
  try {
    const response = await axios.get(`${API_CATEGORIES_URL}/${userID}`);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const deleteCategory = async (categoryID) => {
  try {
    const response = await axios.delete(`${API_CATEGORIES_URL}/${categoryID}`);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const getTODOList = async (userID, categoryID) => {
  try {
    const response = await axios.get(
      `${API_TODO_ITEMS_URL}/fetchAllItems/${userID}/${categoryID}`
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const getTODOItem = async (itemID) => {
  try {
    const response = await axios.get(`${API_TODO_ITEMS_URL}/${itemID}`);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const addTODOItem = async (item) => {
  try {
    const response = await axios.post(API_TODO_ITEMS_URL, item);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const editTODOItem = async (itemID, item) => {
  try {
    const response = await axios.put(`${API_TODO_ITEMS_URL}/${itemID}`, item);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const deleteTODOItem = async (itemID) => {
  try {
    const response = await axios.delete(`${API_TODO_ITEMS_URL}/${itemID}`);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const handleRequestError = (error) => {
  if (error.response) {
    const errorMsg = error.response.data;
    throw new Error(errorMsg);
  } else if (error.request) {
    throw new Error("No response received from the server.");
  } else {
    throw new Error("An error occurred while making the request.");
  }
};

export default {
  getCategories,
  deleteCategory,
  getTODOList,
  getTODOItem,
  addTODOItem,
  editTODOItem,
  deleteTODOItem,
};
