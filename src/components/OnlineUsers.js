import React from 'react';
import { Subscription } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';

const fetchOnlineUsers = gql`
  subscription ($timestamp: timestamptz!, $selfId: Int ) {
    user (
      where: {
        _and: {
          online : {
            last_seen: {
              _gt: $timestamp
            }
          },
          id: {
            _neq: $selfId
          }
        }
        
      }
    ){
      id
      username
    }
  }
`;

const OnlineUsers = (props) => {
  return (
    <Subscription
      subscription={fetchOnlineUsers}
      variables={{
        timestamp: moment().subtract(10, 'seconds').format(),
        selfId: props.userId
      }}
    >
      {
        ({data, error, loading}) => {
          if (loading) { return "Loading"; }
          if (error) { return "Error loading online users"; }
          return (
            <div className="wd25 onlineUsers">
              <p className="userListHeading"> Online Users ({data.user.length})</p>
              <ul className="userList">
                {
                  data.user.map((u) => {
                    return <li key={u.id}>{u.username}</li>
                  })
                }
              </ul>
            </div>  
          );
        }
      }
    </Subscription>
  )
};

export default OnlineUsers;