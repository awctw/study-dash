import axios from "axios";

const URL = "http://localhost:8080/";

const getTimerSettings = async (_id) => {
  return await axios
    .get(URL + `timerSettings/${_id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const putTimerSettings = async (update) => {
  return await axios
    .put(URL + `timerSettings/${update[0]}`, update[1])
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const exports = {
  getTimerSettings,
  putTimerSettings,
};

export default exports;
