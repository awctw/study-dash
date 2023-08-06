import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_SERVER_URL;

const getCategories = async (userID) => {
  try {
    const response = await axios.get(`${API_URL}/api/categories/${userID}`);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const patchCategories = async (changedCategories) => {
  try {
    const response = await axios.patch(`${API_URL}/api/categories/`, {
      changedCategories: changedCategories,
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const deleteCategory = async (categoryID) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/categories/${categoryID}`
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const getTODOList = async (userID, categoryID) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/TODOList/fetchAllItems/${userID}/${categoryID}`
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const getTODOItem = async (itemID) => {
  try {
    const response = await axios.get(`${API_URL}/api/TODOList/${itemID}`);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const addTODOItem = async (item) => {
  try {
    const response = await axios.post(`${API_URL}/api/TODOList`, item);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const editTODOItem = async (itemID, item) => {
  try {
    const response = await axios.put(`${API_URL}/api/TODOList/${itemID}`, item);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const deleteTODOItem = async (itemID) => {
  try {
    const response = await axios.delete(`${API_URL}/api/TODOList/${itemID}`);
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

const services = {
  getCategories,
  patchCategories,
  deleteCategory,
  getTODOList,
  getTODOItem,
  addTODOItem,
  editTODOItem,
  deleteTODOItem,
};

export default services;
