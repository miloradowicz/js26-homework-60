import { useState } from 'react';
import { Card } from 'react-bootstrap';
import MessageForm from '../../components/MessageForm/MessageForm';
import { MessageFormData } from '../../types';

const Chat = () => {
  const [message, setMessages] = useState([]);

  const sendMessage = (message: MessageFormData) => {};

  return (
    <Card>
      <Card.Header>miloradowicz</Card.Header>
      <Card.Body></Card.Body>
      <Card.Footer>
        <MessageForm onSubmit={sendMessage} />
      </Card.Footer>
    </Card>
  );
};

export default Chat;
