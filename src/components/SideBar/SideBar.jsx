import sideBarStyles from "./SideBar.module.css";

function SideBar({ categories }) {
  return (
    <div className={sideBarStyles.sidebar}>
      <h4>User Name</h4>

      <table>
        <tbody>
          <tr>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>To do tasks</td>
            <td>Completed tasks</td>
            <td>Primary tasks</td>
          </tr>
        </tbody>
      </table>

      <div className={sideBarStyles.categories}>
        <h3>Categories</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
