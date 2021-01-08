import client from './client';

const endpoint = '/scoreLogs';

const createLog = (score, cid, username) => client.post(endpoint, { score, cid, username });

export default {
  createLog
}