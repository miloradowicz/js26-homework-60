import { FC, memo } from 'react';
import { Message } from '../../../types.d';

interface MessageItemProps {
  message: Message;
  self: string;
}

const MessageItem: FC<MessageItemProps> = memo(
  ({ message: { message, author, datetime }, self }) => {
    console.log(message);

    return (
      <div>
        <div className={`d-flex mb-1 justify-content-between ${author === self ? 'flex-row-reverse' : ''}`}>
          <div>{author}</div>
          <div className='text-muted'>{datetime.toFormat('ff')}</div>
        </div>
        <div className={`d-flex ms-3 mb-3 ${author === self ? 'justify-content-end' : 'justify-content-start'}`}>
          <p className={`small p-2 rounded-3 text-start ${author === self ? 'bg-warning' : 'bg-secondary-subtle'}`}>{message}</p>
        </div>
      </div>
    );
  },
  (prev, next) => prev.message._id === next.message._id && prev.self === next.self
);

export default MessageItem;
