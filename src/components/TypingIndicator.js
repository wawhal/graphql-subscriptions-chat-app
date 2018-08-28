import React from 'react';
import { Subscription } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';
import '../App.css';

const getUserTyping = gql`
  subscription ($timestamp: timestamptz!, $selfId: Int ) {
    user_typing (
      where: {
        _and: {
          last_typed: {
            _gt: $timestamp
          },
          user_id: {
            _neq: $selfId
          }
        }
      },
      order_by: last_typed_desc,
      limit: 1
    ){
      user_id
      user {
        username
      }
    }
  }
`;


const TypingIndicator = (props) => {
  return (
    <Subscription
      subscription={getUserTyping}
      variables={{
        timestamp: moment().subtract(5, 'seconds').format(),
        selfId: props.userId
      }}
    >
      {
        ({ data, loading, error}) => {
          if (loading) { return null; }
          if (error) { return null; }
          if (data.user_typing.length === 0 || data.user_id === props.userId ) {
            return null;
          } else {
            return `${data.user.username} is typing ...`;
          }
        }
      }
    </Subscription>
  )
};



















export default TypingIndicator;

