import { useImperativeHandle, useState, PropsWithChildren, RefObject, useEffect } from "react"
import { createPortal } from "react-dom"

import modalStyles from "./ToggleableModal.module.css"

interface Props {
  buttonName: string
  ref: RefObject<{ toggleShowModal: () => void }>
}

// ToggleableModal component for 'Create new user', 'New category', 'New ToDo Item' buttons
export default function ToggleableModal({ buttonName, children, ref }: PropsWithChildren<Props>) {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showModal, setShowModal, document.body.style.overflow])

  const toggleShowModal = () => {
    setShowModal(!showModal)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleShowModal,
    }
  })

  return (
    <div className={modalStyles.modal}>
      <button className={modalStyles.button} onClick={() => setShowModal(true)}>
        {buttonName}
      </button>
      {showModal && createPortal(children, document.body)}
      {showModal && <div className={modalStyles.layover} />}
    </div>
  )
}

ToggleableModal.displayName = "Modal"
