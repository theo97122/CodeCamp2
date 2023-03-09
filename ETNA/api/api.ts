import axios from "axios";

// Partage de connexion : 192.168.43.29
// Connexion directe : 192.168.1.15

export const api = axios.create({
<<<<<<< HEAD
  baseURL: `http://172.16.27.10:3000`,
=======
  baseURL: `http://192.168.1.15:3000`,
>>>>>>> 7816fd5b704609e5dba65fe85cccebbd30131601
  timeout: 10000,
  withCredentials: true,
});
