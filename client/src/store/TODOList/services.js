import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/TODOList";
const API_CATEGORY_URL = "http://localhost:8080/api/TODOList/Categories";

// helper for handling error exceptions returned by REST API requests
const handleRequestError = (error) => {
  if (error.response) {
    const errorMsg = error.response.data.message;
    return new Error(errorMsg);
  } else if (error.request) {
    return new Error("No response received from the server.");
  } else {
    return new Error("An error occurred while making the request.");
  }
};

// retrieve the list of todoItem categories
const getCategories = async () => {
  try {
    const response = await axios.get(API_CATEGORY_URL);
    return response.data;
  } catch (error) {
    throw handleRequestError(error);
  }
};

const deleteCategory = async (category) => {
  try {
    const response = await axios.delete(`${API_CATEGORY_URL}/${category}`);
    return response.data;
  } catch (error) {
    throw handleRequestError(error);
  }
};

const getTODOList = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw handleRequestError(error);
  }
};

const getTODOItem = async (itemID) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${itemID}`);
    return response.data;
  } catch (error) {
    throw handleRequestError(error);
  }
};

const addTODOItem = async (item) => {
  try {
    const response = await axios.post(API_BASE_URL, item);
    return response.data;
  } catch (error) {
    throw handleRequestError(error);
  }
};

const editTODOItem = async (itemID, item) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${itemID}`, item);
    return response.data;
  } catch (error) {
    throw handleRequestError(error);
  }
};

const deleteTODOItem = async (itemID) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${itemID}`);
    return response.data;
  } catch (error) {
    throw handleRequestError(error);
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
