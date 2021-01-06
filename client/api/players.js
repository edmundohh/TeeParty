import client from './client';

const endpoint = '/players';

const getPlayers = () => client.get(endpoint);

const createPlayer = (username, name, password) => client.post(endpoint, { username, name, password });

export default {
  getPlayers,
  createPlayer
}