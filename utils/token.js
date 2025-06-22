import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "muuki_token";
const USER_KEY = "muuki_user";

export const saveAuth = async (token, user) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const getUser = async () => {
  const data = await AsyncStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearAuth = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(USER_KEY);
};