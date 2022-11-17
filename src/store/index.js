import { createStore,combineReducers }from 'redux';
import AuthReducers from './reducers';
const RootReducers= combineReducers({
    AuthReducers,
});

export const store=createStore(RootReducers);