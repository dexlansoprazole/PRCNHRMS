import React from 'react';

const Toast = (props) => {
  return (
    <div className="toast" style={{minWidth: 300}}>
      <div className="toast-header">
        <span className={"rounded mr-2 p-2 bg-" + props.type}></span>
        <strong className="mr-auto">{props.title}</strong>
        <button type="button" className="ml-2 mb-1 close" onClick={props.remove}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body">
        {props.msg}
      </div>
    </div>
  );
}

export default Toast;