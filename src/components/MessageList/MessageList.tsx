import { MessageView } from '../../types.d';
import { FC, useEffect, useRef } from 'react';
import MessageItem from './MessageItem/MessageItem';

interface MessageListProps {
  messages: MessageView[];
}

const MessageList: FC<MessageListProps> = ({ messages }) => {
  const dummy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dummy.current?.scrollIntoView();
  }, [messages]);

  return (
    <>
      {messages.map((x) => (
        <MessageItem key={x._id} message={x} />
      ))}
      <div ref={dummy} />
    </>
  );
};

export default MessageList;
