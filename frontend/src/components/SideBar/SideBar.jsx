import { useRef } from "react";

import ToggleableModal from "../Modal/ToggleableModal";
import NewCategoryForm from "../NewCategoryForm/NewCategoryForm";

import { STATUS } from "../../constants/statusConstants";

import sideBarStyles from "./SideBar.module.css";

function SideBar({ categories, todoList }) {
  const completedTasks = todoList.filter(
    (item) => item.status === STATUS.COMPLETED
  ).length;

  const activeTasks = todoList.filter(
    (item) => item.status === STATUS.ACTIVE
  ).length;

  const categoryFormRef = useRef();

  const handleClose = () => {
    categoryFormRef.current.toggleShowModal();
  };

  return (
    <div className={sideBarStyles.sidebar}>
      <div className={sideBarStyles.userinfo}>
        <h3>User Name</h3>

        <table className={sideBarStyles.stats}>
          <tbody>
            <tr className={sideBarStyles.numbersRow}>
              <td>{activeTasks}</td>
              <td>{completedTasks}</td>
              <td>{todoList.length}</td>
            </tr>
            <tr className={sideBarStyles.tableTexts}>
              <td>Active</td>
              <td>Completed</td>
              <td>Total</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="divider"></div>

      <div className={sideBarStyles.categories}>
        <h3>Categories</h3>

        <ul>
          {categories.map((category) => (
            <li key={category.id} className={sideBarStyles.category}>{category.name}</li>
          ))}
        </ul>

        <ToggleableModal
          buttonName="New category"
          styles={sideBarStyles.button}
          ref={categoryFormRef}
        >
          <NewCategoryForm onClose={handleClose} />
        </ToggleableModal>
      </div>
    </div>
  );
}

export default SideBar;
