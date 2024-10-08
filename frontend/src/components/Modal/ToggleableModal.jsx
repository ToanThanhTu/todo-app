import { useImperativeHandle, forwardRef, useState } from "react";
import { createPortal } from "react-dom";

import modalStyles from './ToggleableModal.module.css';

// ToggleableModal component for 'Create new user', 'New category', 'New ToDo Item' buttons
const ToggleableModal = forwardRef((props, refs) => {
  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleShowModal,
    };
  });

  return (
    <div className={modalStyles.modal}>
      <button className={modalStyles.button} onClick={() => setShowModal(true)}>
        {props.buttonName}
      </button>
      {showModal && createPortal(props.children, document.body)}
    </div>
  );
});

ToggleableModal.displayName = "Modal";

export default ToggleableModal;
