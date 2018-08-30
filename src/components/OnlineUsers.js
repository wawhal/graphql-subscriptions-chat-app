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
      },
      order_by: username_asc
    ){
      id
      username
    }
  }
`;

class OnlineUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().subtract(10, 'seconds').format(),
    }
  }

  componentDidMount () {
    setInterval(
      () => this.setState({ time: moment().subtract(10, 'seconds').format()}),
      10000
    );
  }

  render() {
    return (
      <div className="wd25 onlineUsers">
        <Subscription
          subscription={fetchOnlineUsers}
          variables={{
            timestamp: this.state.time,
            selfId: this.props.userId
          }}
        >
          {
            ({data, error, loading}) => {
              if (loading) {
                return (
                  <p className="userListHeading"> Online Users</p> 
                )
              }
              if (error) { return "Error loading online users"; }
              return (
                <div>
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
      </div>  
    );
  }
  
};

export default OnlineUsers;