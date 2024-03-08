import React from "react";

const Modal = (props) => {
  const handleCloseClick = () => {
    props.onModalClick();
  };

  return (
    <>
      <section id="modal">
        <h1>Finish!</h1>
        <h1>{props.time}s</h1>
        <div id="close" onClick={handleCloseClick}>
          閉じる
        </div>
      </section>
      <div id="mask"></div>
    </>
  );
};

export default Modal;
