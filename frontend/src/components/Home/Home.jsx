import homeStyles from "./Home.module.css";

function Home() {
  return (
    <div>
      <h1>ToDo App</h1>
      <h2>Welcome to your simple ToDo App</h2>
      <h3>Features:</h3>
      <ul className={homeStyles.features}>
        <li>Create and login with a new user account</li>
        <li>Create Categories</li>
        <li>Delete Categories along with its ToDo items</li>
        <li>Create ToDo items</li>
        <li>Update ToDo items status (Active, Completed and Cancelled)</li>
        <li>Filter ToDo items based on Categories and Statuses</li>
        <li>ToDo items status summary</li>
      </ul>
      <p>Developed by Thanh Toan Tu</p>
      <p>
        Source code:{" "}
        <a href="https://github.com/ToanThanhTu/todo-app" target="_blank">
          GitHub
        </a>
      </p>
    </div>
  );
}

export default Home;
