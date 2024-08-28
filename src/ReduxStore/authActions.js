export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGOUT = 'LOGOUT';

export const login = (username, password) => {
  return (dispatch) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    } else {
      dispatch({ type: LOGIN_FAILURE, payload: 'Invalid username or password.' });
    }
  };
};

export const register = (username, password) => {
  return (dispatch) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);

    if (userExists) {
      dispatch({ type: REGISTER_FAILURE, payload: 'Username already exists.' });
    } else {
      const newUser = { username, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      dispatch({ type: REGISTER_SUCCESS, payload: newUser });
    }
  };
};

export const logout = () => {
  localStorage.removeItem('currentUser');
  return { type: LOGOUT };
};