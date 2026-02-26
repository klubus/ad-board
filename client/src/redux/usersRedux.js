// selectors
export const getUser = (state) => state.user;

// actions
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

// action creators
export const logIn = (payload) => ({
  type: LOG_IN,
  payload,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const logInUser = (login, password) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // <- kluczowe, żeby cookies były zapisane
        body: JSON.stringify({ login, password }),
      });

      if (!res.ok) throw new Error('Login failed');

      const data = await res.json(); // np. { _id, login, message }

      // wywołujemy Twoją istniejącą akcję logIn
      dispatch(logIn(data));
    } catch (err) {
      console.error('Login error:', err);
    }
  };
};

const usersReducer = (statePart = null, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return null;
    default:
      return statePart;
  }
};

export default usersReducer;
