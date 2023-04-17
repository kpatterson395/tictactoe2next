import axios from "axios";

export const getInfo = () => {
  return axios
    .get("/api/gameStatus")
    .then((output) => {
      console.log("output", output.data.gameplay);
      return output.data;
    })
    .catch((error) => console.log(error));
};

export const getInformationMessage = () => {
  setInterval(() => getInfo(), 5000);
};
