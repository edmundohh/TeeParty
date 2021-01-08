import client from './client';

const endpoint = '/courses';

const getCourses = () => client.get(endpoint);

const getCourseById = (cid) => client.get(endpoint + '/'+cid);

// const createCourse = (username, name, password) => client.post(endpoint, { username, name, password });

export default {
  getCourses,
  getCourseById
}