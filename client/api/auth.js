import client from "./client";

const endpoint = "/auth";

const login = (username, password) => client.post(endpoint, { username, password });

export default {
  login,
};