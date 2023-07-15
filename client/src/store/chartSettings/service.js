import axios from "axios";

const URL = "http://localhost:8080/";

const getChartSettings = async (userID) => {
  return await axios
    .get(URL + `chartSettings/${userID}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const putChartSettings = async (update) => {
  return await axios
    .put(URL + `chartSettings/${update[0]}`, update[1])
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const exports = {
  getChartSettings,
  putChartSettings,
};

export default exports;
