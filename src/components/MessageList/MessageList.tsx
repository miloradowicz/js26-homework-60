import { Message } from '../../types.d';
import { FC, useEffect, useRef } from 'react';
import MessageItem from './MessageItem/MessageItem';

interface MessageListProps {
  messages: Message[];
  self: string;
}

const MessageList: FC<MessageListProps> = ({ messages, self }) => {
  const dummy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dummy.current?.scrollIntoView();
  }, [messages]);

  return (
    <>
      {messages.map((x) => (
        <MessageItem key={x._id} message={x} self={self} />
      ))}
      <div ref={dummy} />
    </>
  );
};

export default MessageList;
