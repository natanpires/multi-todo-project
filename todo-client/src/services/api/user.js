import { callApiBase } from './base';

const userApi = {
  login: (data) =>
    callApiBase({
      title: 'Auth - Login',
      endpoint: '/login',
      method: 'POST',
      data,
    }),
  signup: (data) =>
    callApiBase({
      title: 'Auth - Sign Up',
      endpoint: '/signup',
      method: 'POST',
      data,
    }),
};

export default userApi;
export { userApi };
