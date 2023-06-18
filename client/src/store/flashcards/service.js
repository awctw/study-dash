import axios from "axios";

const URL = "http://localhost:3001/";

const getModules = async () => {
  const response = await axios
    .get(URL + "flashcards")
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

  return response;
};

const addModule = async (module) => {
  const response = await axios
    .post(URL + "flashcards", module, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

  return response;
};

export default {
  addModule,
  getModules,
};
