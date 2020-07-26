/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
export const signup = async (
  name,
  location,
  email,
  password,
  passwordConfirm
  //photo
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/signup',
      data: {
        name,
        location,
        email,
        password,
        passwordConfirm,
        //photo,
      },
    });
    console.log(res);

    if (res.data.status === 'success' || res.data.status === 'succes') {
      showAlert('success', 'Account created successfully!');
      window.setTimeout(() => {
        window.location.replace('/me');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err.response.data.message);
  }
};
