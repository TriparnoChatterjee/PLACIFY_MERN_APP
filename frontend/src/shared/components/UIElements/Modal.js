import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import React from "react";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";
const ModalOverlay = (props) => {
  const content = (
    <div
      className={`${classes["modal"]} ${props.className} style={props.style}`}
    >
      <header className={`${classes["modal__header"]} ${props.className}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault
        }
      >
        <div className={`${classes["modal__content"]} ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`${classes["modal__footer"]} ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel}></Backdrop>}
      <CSSTransition
        in={props.show}
        timeout={200}
        classNames={classes['modal']}
        mountOnEnter
        unmountOnExit
      >
        <ModalOverlay {...props}>
              
        </ModalOverlay>
      </CSSTransition>
    </React.Fragment>
  );
};
export default Modal;
