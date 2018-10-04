import React from 'react';
import { Mutation } from 'react-apollo';
import TypingIndicator from './TypingIndicator';
import { insertMessage, emitTypingEvent } from '../graphqlQueries';
import '../App.css';

export default class Textbox extends React.Component {

  constructor(props) {
    super()
    this.state = {
      text: ""
    }
  }

  handleTyping = (text, mutate) => {
    const textLength = text.length;
    if ((textLength !== 0 && textLength % 5 === 0) || textLength === 1) {
      // this.emitTypingEvent(mutate);
    }
    this.setState({ text });
  }

  /*emit typing event in componentDidMount*/ 

  render() {
    // Mutation component. Add message to the state of <RenderMessages> after mutation.
    const sendMessage = (e) => {
      e.preventDefault();
      // insert the chat message
      // render the new chat message in the box
      this.props.mutationCallback({text: this.state.text, username: this.props.username});
      // reset the textbox
      this.setState({text: ''});
    }
    const client = 'client received from Mutationn'
    return this.form(sendMessage, client);
  }

  form = (sendMessage, client) => {
    return (
      <form onSubmit={sendMessage}>
        <div className="textboxWrapper">
          <TypingIndicator userId={this.props.userId} />
          <input
            id="textbox"
            className="textbox typoTextbox"
            value={this.state.text}
            autoFocus={true}
            onChange={(e) => {
              this.handleTyping(e.target.value, client.mutate);
            }}
            autoComplete="off"
          />
          <button
            className="sendButton typoButton"
            onClick={sendMessage}
          > Send </button>
        </div>
      </form>
    );
  }
}
