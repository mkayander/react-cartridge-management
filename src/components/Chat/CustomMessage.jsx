import React from 'react';

import './styles.scss';

function CustomMessage(props) {
  return (
    <div className={`rcw-response`}>
      {/*<div className="rcw-message-text" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />*/}
        <div className="rcw-message-text" >
            <p>{props.message}</p>
        </div>
      {/*<span className="rcw-timestamp">{format(props.date, 'hh:mm')}</span>*/}
      <span className="rcw-timestamp">{props.date}</span>
    </div>
  );
}

export default CustomMessage;