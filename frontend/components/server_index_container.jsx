import { connect } from 'react-redux';
import { fetchServers, createServer} from '../actions/server_actions';
import ServerIndex from './server_index';
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  servers: Object.values(state.entities.servers)
});

const mapDispatchToProps = dispatch => ({
  fetchServers: () => dispatch(fetchServers()),
  createServer: server=>dispatch(createServer(server))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerIndex));