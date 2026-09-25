import axiosInstance from './axiosInstance';

const login = (username, password) => {
  return axiosInstance
    .post('/auth/login', { username, password, expiresInMins: 60 })
    .then((res) => res.data);
};

export { login };