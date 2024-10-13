import { FC, memo } from 'react';
import { Alignment, MessageView } from '../../../types.d';

interface MessageItemProps {
  message: MessageView;
}

const MessageItem: FC<MessageItemProps> = memo(
  ({ message: { message, author, datetime, alignment } }) => {
    console.log(message);

    return (
      <div>
        <div className={`d-flex mb-1 justify-content-between ${alignment === Alignment.Right ? 'flex-row-reverse' : ''}`}>
          <div>{author}</div>
          <div className='text-muted'>{datetime.toFormat('ff')}</div>
        </div>
        <div className='d-flex ms-3 mb-3 justify-content-start'>
          <p className='small p-2 rounded-3 text-start bg-body-tertiary'>{message}</p>
        </div>
      </div>
    );
  },
  ({ message: prev }, { message: next }) => prev._id === next._id
);

export default MessageItem;
