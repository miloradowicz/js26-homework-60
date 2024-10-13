import { MessageFormData } from '../../types.d';
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

interface MessageFormProps {
  onSubmit: (_: MessageFormData) => void;
}

const validateData = (data: MessageFormData) => {
  if (!data.message?.trim()) {
    return false;
  }

  return true;
};

const MessageForm: FC<MessageFormProps> = ({ onSubmit }) => {
  const [data, setData] = useState<MessageFormData>({ message: '' });

  const updateData: ChangeEventHandler<HTMLInputElement> = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const sendData: FormEventHandler = (e) => {
    e.preventDefault();

    if (validateData(data)) {
      onSubmit(data);
    }

    setData({ message: '' });
  };

  return (
    <Form onSubmit={sendData}>
      <InputGroup>
        <Form.Control type='text' name='message' placeholder='Type your message...' value={data.message} onChange={updateData} />
        <Button variant='warning' type='submit'>
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
