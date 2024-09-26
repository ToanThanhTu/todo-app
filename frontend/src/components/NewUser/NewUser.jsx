import { useRef } from "react";
import ToggleableModal from "../Modal/ToggleableModal";
import NewUserStyles from "./NewUser.module.css";
import { useDispatch } from "react-redux";
import { create } from "../../reducers/userReducer";

function NewUserButton() {
  const newUserFormRef = useRef();

  const handleClose = () => {
    newUserFormRef.current.toggleShowModal();
  };

  return (
    <ToggleableModal buttonName="Create new user" ref={newUserFormRef}>
      <NewUserForm onClose={handleClose} />
    </ToggleableModal>
  );
}

function NewUserForm({ onClose }) {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = event.target.newUsername.value;
    const password = event.target.newPassword.value;

    dispatch(create(username, password));

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={NewUserStyles.modal}>
      <h1>Create New User</h1>

      <label htmlFor="new-username">Username:</label>
      <input type="text" id="new-username" name="newUsername" />
      <label htmlFor="new-password">Password:</label>
      <input type="password" id="new-password" name="newPassword" />

      <div className="buttonsContainer">
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </form>
  );
}

export default NewUserButton;
