import client from './client';

const endpoint = '/players';

const getPlayers = () => client.get(endpoint);

const getPlayerByUsername = (username) => client.get(endpoint + '/'+username);

const createPlayer = (username, name, password) => client.post(endpoint, { username, name, password });

const followPlayer = (currentUsername, playerToFollow) => client.put(endpoint + '/'+currentUsername, { playerToFollow });

const getFollowing = (currentUsername) => client.get(endpoint + '/'+currentUsername + '/following');

const checkFollowing = (currentUsername, followingTarget) => client.get(endpoint + '/'+currentUsername + '/isFollowing' + '/'+followingTarget);

const getScoreLogsByUsername = (username) => client.get(endpoint + '/'+username + '/scoreLogs');

const getFollowingScoreLogs = (currentUsername, cid) => client.get(endpoint + '/'+currentUsername + '/following' + '/'+cid + '/scoreLogs');

const getScoreLogsFeed = (currentUsername) => client.get(endpoint + '/'+currentUsername + '/feed');

export default {
  getPlayers,
  getPlayerByUsername,
  createPlayer,
  followPlayer,
  getFollowing,
  checkFollowing,
  getScoreLogsByUsername,
  getFollowingScoreLogs,
  getScoreLogsFeed
}