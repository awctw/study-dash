import axios from "axios";

const URL = process.env.REACT_APP_BASE_SERVER_URL;

const getHabits = async (userID) => {
  const response = await axios
    .get(URL + `/habits/${userID}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const addHabit = async (habit) => {
  const response = await axios
    .post(URL + "/habits", habit, {
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

const toggleHabbitDate = async (habitID) => {
    const response = await axios
        .patch(URL + `/habits/${habitID}`, {
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

const deleteHabit = async (habitID) => {
  const response = await axios
    .delete(URL + `/habits/${habitID}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
    return response;
}

const exports = { getHabits, addHabit, toggleHabbitDate, deleteHabit };

export default exports;
