import React from 'react';
import { Subscription } from 'react-apollo';
import moment from 'moment';
import { fetchOnlineUsersSubscription } from '../graphqlQueries';

class OnlineUsers extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      time: moment().subtract(10, 'seconds').format(),
      refetch: null
    }
  }

  render() {
    const data = {
      user_online: [
        {
          id: 1,
          username: 'user1'
        },
        {
          id: 2,
          username: 'user2'
        } 
      ]
    }
    return (
      <div className="onlineUsers">
        <div>
         <p className="userListHeading"> Online Users ({!data.user_online ? 0 : data.user_online.length})</p>
          <ul className="userList">
            { 
              data.user_online.map((u) => {
                return <li key={u.id}>{u.username}</li>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
};

export default OnlineUsers;
