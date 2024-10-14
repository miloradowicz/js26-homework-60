import { DateTime } from 'luxon';
import { MessageFormData, Message, UsernameFormData } from '../../types.d';
import { getMessages, postMessage } from '../../lib/chat-api';
import { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import UsernameModal from '../../components/UsernameModal/UsernameModal';
import MessageForm from '../../components/MessageForm/MessageForm';
import MessageList from '../../components/MessageList/MessageList';

const defaults = {
  updateInterval: 3000,
  username: 'miloradowicz',
};

let lastUpdated: DateTime | undefined;

const Chat = () => {
  const [username, setUsername] = useState(defaults.username);
  const [messages, setMessages] = useState<Message[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(pollMessages, defaults.updateInterval);

    return () => clearInterval(interval);
  });

  const pollMessages = async () => {
    try {
      const newMessages = await getMessages(lastUpdated?.plus(1));

      if (newMessages.length !== 0) {
        lastUpdated = newMessages[newMessages.length - 1].datetime;
        setMessages((messages) => [...messages, ...newMessages]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async (data: MessageFormData) => {
    try {
      await postMessage(username, data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const updateUsername = (data: UsernameFormData) => {
    setUsername(data.username);
  };

  return (
    <Container>
      <Card>
        <Card.Header className='d-flex justify-content-between align-items-center'>
          {username}
          <Button type='button' onClick={() => setModalVisible(true)}>
            Change username
          </Button>
        </Card.Header>
        <Card.Body className='overflow-auto' style={{ height: '80dvh' }}>
          <MessageList messages={messages} self={username} />
        </Card.Body>
        <Card.Footer>
          <MessageForm onSubmit={sendMessage} />
        </Card.Footer>
      </Card>
      <UsernameModal show={modalVisible} onClose={() => setModalVisible(false)} onSubmit={updateUsername} initial={username} />
    </Container>
  );
};

export default Chat;
