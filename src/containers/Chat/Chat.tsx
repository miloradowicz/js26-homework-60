import { DateTime } from 'luxon';
import { Message, MessageFormData, UsernameFormData } from '../../types.d';
import { getMessages, postMessage } from '../../lib/chat-api';
import { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import UserSwitchModal from '../../components/UsernameModal/UsernameModal';
import MessageForm from '../../components/MessageForm/MessageForm';
import MessageList from '../../components/MessageList/MessageList';

const defaults = {
  updateInterval: 3000,
  username: 'miloradowicz',
};

let lastUpdated: DateTime = DateTime.min();

const Chat = () => {
  const [username, setUsername] = useState('miloradowicz');
  const [messages, setMessages] = useState<Message[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(pollMessages, defaults.updateInterval);

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
          <MessageList messages={messages} />
        </Card.Body>
        <Card.Footer>
          <MessageForm onSubmit={sendMessage} />
        </Card.Footer>
      </Card>
      <UserSwitchModal show={modalVisible} onClose={() => setModalVisible(false)} onSubmit={updateUsername} defaultUsername={defaults.username} />
    </Container>
  );
};

export default Chat;
