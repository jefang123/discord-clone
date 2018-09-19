import * as APIChannel from '../util/channel_api_util';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';

export const receiveChannels = channels => {
  return {
    type: RECEIVE_CHANNELS,
    channels
  };
};

export const removeChannel = (id) => {
  return {
    type: REMOVE_CHANNEL,
    channelId:id
  };
};

export const receiveChannel = payload => {
  return {
    type: RECEIVE_CHANNEL,
    channel: payload.channel,
    messages: payload.messages
  };
};


export const fetchChannels = () => {
  return dispatch => {
    return APIChannel.fetchChannels().then(
      channels => {
        return dispatch(receiveChannels(channels));
      }
      // errors => {
      //   return dispatch(receiveErrors(errors));
      // }
    );
  };
};

export const fetchChannel = (id) => {
  return dispatch => {
    return APIChannel.fetchChannel(id).then(
      payload => {
        return dispatch(receiveChannel(payload));
      }
    );
  };
};

export const updateChannel = channel => {
  return dispatch => {
    return APIChannel.updateChannel(channel).then(
      payload => {
        return dispatch(receiveChannel(payload));
      }
    );
  };
};


export const createChannel = channel => {
  return dispatch => {
    return APIChannel.createChannel(channel).then(
      payload => {
        return dispatch(receiveChannel(payload));
      }
    );
  };
};


export const deleteChannel = id => {
  return dispatch => {
    return APIChannel.deleteChannel(id).then(
      channel => {
        return dispatch(removeChannel(id));
      }
    );
  };
};