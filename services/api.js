import { AsyncStorage } from "react-native";
import { create } from "apisauce";

const api = create({
  baseURL: "http://localhost:3000",
});

api.addAsyncRequestTransform((request) => async () => {
  const token = await AsyncStorage.getItem("@i9App:token");

  if (token) request.headers["Authorization"] = token;
});

api.addResponseTransform((response) => {
  if (!response.ok) throw response;
});

export default api;
