import gql from 'graphql-tag';

export const fetchOnlineUsersSubscription = gql`
  subscription {
    user_online (
      order_by: username_asc
    ) {
      id
      username
    }
  }
`;

export const subscribeToNewMessages = gql`
  subscription {
    message ( order_by: id_desc limit: 1) {
      id
      username
      text
      timestamp
    } }
`;

export const emitOnlineEvent = gql`
  mutation ($userId:Int!){
    update_user (
      _set: {
        last_seen: "now()"
      }
      where: {
        id: {
          _eq: $userId
        }
      }
    ) {
      affected_rows
    }
  }
`;

export const getUserTyping = gql`
  subscription ($selfId: Int ) {
    user_typing (
      where: {
        id: {
          _neq: $selfId
        }
      },
      limit: 1
      order_by: last_typed_desc
    ){
      last_typed
      username
    }
  }
`;

export const insertMessage = gql`
  mutation insert_message ($message: message_insert_input! ){
    insert_message (
      objects: [$message]
    ) {
      returning {
        id
        timestamp
        text
        username
      }
    }
  }
`;

export const emitTypingEvent = gql`
  mutation ($userId: Int) {
    update_user (
      _set: {
        last_typed: "now()"
      }
      where: {
        id: {
          _eq: $userId
        }
      }
    ) {
      affected_rows
    }
  }
`;

export const addUser = gql`
  mutation ($username: String!) {
    insert_user (
      objects: [{
        username: $username
      }]
    ) {
      returning {
        id
        username
      }
    }
  }
`;

export const fetchMessages = gql`
  query ($last_received_id: Int, $last_received_ts: timestamptz){
    message (
      order_by: timestamp_asc
      where: {
        _and: {
          id: {
            _neq: $last_received_id
          },
          timestamp: {
            _gte: $last_received_ts
          }
        }

      }
    ) {
      id
      text
      username
      timestamp
    }
  }
`;