import axios from "axios";

const URL = "http://localhost:8080/";

const getChartSettings = async (userEmail) => {
  return await axios
    .get(URL + `chartSettings/${userEmail}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const putChartSettings = async (userEmail, chartSettings) => {
  return await axios
    .put(URL + `chartSettings/${userEmail}`, chartSettings, {
      headers: {
        "Content-Type": "application/json",
      },
    })
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
