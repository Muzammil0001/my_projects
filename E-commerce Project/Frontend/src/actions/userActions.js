import{ USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAILURE}
from '../constants/registerConstant'
import{ USER_LOGIN_SUCCESS }
from '../constants/userConstants'
import axios from 'axios';

export const register = (name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };
      const { data } = await axios.post("http://localhost:5000/api/users/",
        { name, email, password },
        config
      );
  
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
  
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };