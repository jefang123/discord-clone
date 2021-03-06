import * as APIChannel from '../util/channel_api_util';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const RECEIVE_CHANNEL_ERRORS = 'RECEIVE_CHANNEL_ERRORS';

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

export const receiveChannel = channel => {
  return {
    type: RECEIVE_CHANNEL,
    channel: channel,
  };
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_CHANNEL_ERRORS,
    errors
  };
};

export const fetchChannels = () => {
  return dispatch => {
    return APIChannel.fetchChannels().then(
      channels => {
        return dispatch(receiveChannels(channels));
      }
    );
  };
};

export const fetchChannel = (id) => {
  return dispatch => {
    return APIChannel.fetchChannel(id).then(
      channel => {
        return dispatch(receiveChannel(channel));
      }
    );
  };
};

export const updateChannel = channel => {
  return dispatch => {
    return APIChannel.updateChannel(channel).then(
      channel => {
        return dispatch(receiveChannel(channel));
      }
    );
  };
};


export const createChannel = channel => {
  return dispatch => {
    return APIChannel.createChannel(channel).then(
      channel => {
        return dispatch(receiveChannel(channel));
      },
      errors => {
        return dispatch(receiveErrors(errors.responseJSON));
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