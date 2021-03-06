import { combineReducers } from 'redux';
import searchServer from './search_servers_reducer';
import searchUser from './search_users_reducer';

export default combineReducers({
  servers: searchServer,
  users: searchUser
})