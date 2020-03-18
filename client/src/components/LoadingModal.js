import React, {useEffect} from 'react';

const LoadingModal = () => {
  useEffect(() => {
    window.$('#loadingModal').modal({backdrop: "static"});
  });

  return (
    <div className="modal fade" id="loadingModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-light" style={{backgroundColor: "#ff000000", border: 0}}>
          <div className="modal-body text-center">
            <h3>Loading... </h3>
            <div className="spinner-border text-light" role="status">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingModal;