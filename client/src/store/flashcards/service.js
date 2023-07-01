import axios from "axios";

const URL = "http://localhost:8080/";

const getModules = async (userID) => {
  const response = await axios
    .get(URL + `flashcards/${userID}`)
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

const addFlashcard = async (cardData) => {
  const response = await axios
    .patch(
      URL + `flashcards/${cardData.moduleId}`,
      {
        question: cardData.question,
        answer: cardData.answer,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

  return response;
};

const editFlashcard = async (cardData) => {
  const response = await axios
    .patch(
      URL + `flashcards/edit/${cardData.moduleId}`,
      {
        question: cardData.question,
        answer: cardData.answer,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          cardIndex: cardData.cardIndex,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

  return response;
};

export default {
  addModule,
  getModules,
  addFlashcard,
  editFlashcard,
};
