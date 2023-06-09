import axios from "axios";

const URL = "http://localhost:8080/";

const getHabits = async (userID) => {
  const response = await axios
    .get(URL + `habits/${userID}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const addHabit = async (habit) => {
  const response = await axios
    .post(URL + "habits", habit, {
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

export default { getHabits, addHabit };
