import { DateTime } from 'luxon';
import { Message, MessageFormData } from '../../types.d';
import { getMessages, postMessage } from '../../lib/chat-api';
import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import MessageForm from '../../components/MessageForm/MessageForm';
import MessageList from '../../components/MessageList/MessageList';

const updateInterval = 3000;

let lastUpdated: DateTime = DateTime.min();

const Chat = () => {
  const [user, setUser] = useState('miloradowicz');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const interval = setInterval(pollMessages, updateInterval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {});

  const pollMessages = async () => {
    try {
      const newMessages = await getMessages(lastUpdated);

      if (newMessages.length !== 0) {
        lastUpdated = newMessages[newMessages.length - 1].datetime;
      }

      setMessages((messages) => [...messages, ...newMessages]);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async (message: MessageFormData) => {
    try {
      await postMessage(user, message.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Card>
        <Card.Header>miloradowicz</Card.Header>
        <Card.Body className='overflow-auto' style={{ height: '80dvh' }}>
          <MessageList messages={messages} />
        </Card.Body>
        <Card.Footer>
          <MessageForm onSubmit={sendMessage} />
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Chat;
