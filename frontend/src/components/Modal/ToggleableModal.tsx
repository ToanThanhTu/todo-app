import {
  useImperativeHandle,
  useState,
  PropsWithChildren,
  RefObject,
  useEffect,
  CSSProperties,
} from "react"
import { createPortal } from "react-dom"

import styles from "./ToggleableModal.module.css"

interface Props {
  buttonName: string
  btnStyle?: CSSProperties
  handleMouseEnter?: () => void
  handleMouseLeave?: () => void
  ref: RefObject<{ toggleShowModal: () => void } | null>
}

// ToggleableModal component for 'Create new user', 'New category', 'New ToDo Item' buttons
export default function ToggleableModal({
  buttonName,
  btnStyle,
  handleMouseEnter,
  handleMouseLeave,
  children,
  ref,
}: PropsWithChildren<Props>) {
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
    <div>
      <button
        className={styles.button}
        onClick={() => setShowModal(true)}
        style={btnStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {buttonName}
      </button>
      {showModal && createPortal(children, document.body)}
      {showModal && <div className={styles.layover} />}
    </div>
  )
}

ToggleableModal.displayName = "Modal"
