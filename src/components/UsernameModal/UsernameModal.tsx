import { UsernameFormData } from '../../types.d';
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';

interface UsernameModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (_: UsernameFormData) => void;
  defaultUsername: string;
}

const validateData = (data: UsernameFormData) => {
  if (!data.username?.trim()) {
    return false;
  }

  return true;
};

const UsernameModal: FC<UsernameModalProps> = ({ show, onClose, onSubmit, defaultUsername }) => {
  const [data, setData] = useState({ username: defaultUsername });

  const updateData: ChangeEventHandler<HTMLInputElement> = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const sendData: FormEventHandler = (e) => {
    e.preventDefault();

    if (validateData(data)) {
      onSubmit(data);
      setData({ username: '' });
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={sendData}>
        <Modal.Header closeButton>
          <Modal.Title>Hello</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <InputGroupText>Username</InputGroupText>
            <Form.Control type='text' name='username' value={data.username} onChange={updateData} />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button type='button' variant='danger' onClick={onClose}>
            Close
          </Button>
          <Button type='submit' variant='primary'>
            Set username
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UsernameModal;
