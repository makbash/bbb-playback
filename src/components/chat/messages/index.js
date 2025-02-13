import React from 'react';
import PropTypes from 'prop-types';
import UserMessage from './user';
import PollMessage from './poll';
import {
  ID,
  getMessageType,
} from 'utils/data';
import './index.scss';

const propTypes = {
  chat: PropTypes.array,
  currentDataIndex: PropTypes.number,
  player: PropTypes.object,
  setRef: PropTypes.func,
};

const defaultProps = {
  chat: [],
  currentDataIndex: 0,
  player: {},
  setRef: () => {},
};

const Messages = ({
  chat,
  currentDataIndex,
  player,
  setRef,
}) => {

  return (
    <div className="list">
      <div className="message-wrapper">
        {chat.map((item, index) => {
          const active = index <= currentDataIndex;
          const { timestamp } = item;
          const type = getMessageType(item);
          switch (type) {
            case ID.USERS:

              return (
                <span ref={node => setRef(node, index)}>
                  <UserMessage
                    active={active}
                    hyperlink={item.hyperlink}
                    initials={item.initials}
                    name={item.name}
                    player={player}
                    text={item.message}
                    timestamp={timestamp}
                  />
                </span>
              );
            case ID.POLLS:

              return (
                <span ref={node => setRef(node, index)}>
                  <PollMessage
                    active={active}
                    answers={item.answers}
                    player={player}
                    question={item.question}
                    responders={item.responders}
                    timestamp={timestamp}
                    type={item.type}
                  />
                </span>
              );
            default:
              return <span ref={node => setRef(node, index)} />;
          }
        })}
      </div>
    </div>
  );
};

Messages.propTypes = propTypes;
Messages.defaultProps = defaultProps;

export default Messages;
