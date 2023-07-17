import axios from "axios";

const URL = process.env.BASE_SERVER_URL;

const getModules = async (userID) => {
  const response = await axios
    .get(URL + `/flashcards/${userID}`)
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

const deleteFlashcard = async (cardData) => {
  const response = await axios
    .delete(URL + `flashcards/${cardData.moduleId}/${cardData.index}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

  return cardData;
};

const deleteModule = async (moduleId) => {
  const response = await axios
    .delete(URL + `flashcards/${moduleId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

  return moduleId;
};

const getScheduledCards = async (userID) => {
  const response = await axios
    .get(URL + `flashcards/sra/${userID}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

  return response;
};

const refreshFlashcard = async (cardData) => {
  const response = await axios
    .patch(
      URL + `flashcards/refresh/${cardData.cardId}`,
      {
        quality: cardData.quality,
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

export default {
  addModule,
  getModules,
  addFlashcard,
  editFlashcard,
  deleteFlashcard,
  deleteModule,
  getScheduledCards,
  refreshFlashcard,
};
