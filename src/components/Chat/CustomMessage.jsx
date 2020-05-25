import React from 'react';

import './styles.scss';

function CustomMessage(props) {
  return (
    <div className={`rcw-${props.client ? "client" : "response"}`}>
      {/*<div className="rcw-message-text" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />*/}
        <div className="rcw-message-text" >
            <p>{props.msgData.message}</p>
        </div>
      {/*<span className="rcw-timestamp">{format(props.date, 'hh:mm')}</span>*/}
      <span className="rcw-timestamp">{props.msgData.date}</span>
    </div>
  );
}

export default CustomMessage;