import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// delete this line when redux is used
const reducer = (state, action) => state;

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
