# A Simple ToDo App

## Features

- Create and login with username and password
- Create Categories
- Delete Categories along with its ToDo items
- Create ToDo items
- Update ToDo items status (Active, Completed and Cancelled)
- Filter ToDo items based on Categories and Statuses
- ToDo items status summary

## Folder Structure

```
ToDo App
├── backend
│   ├── controllers
│   ├── dist
│   │   └── assets
│   ├── models
│   ├── utils
│   ├── index.js
│   └── app.js
└── frontend
    ├── dist
    │   └── assets
    ├── public
    │   └── todo-app.png
    ├── src
    │   ├── components
    │   │   ├── Contacts
    │   │   ├── Home
    │   │   ├── Login
    │   │   ├── Modal
    │   │   ├── NavBar
    │   │   ├── NewCategoryForm
    │   │   ├── NewTodo
    │   │   ├── NewUser
    │   │   ├── SideBar
    │   │   ├── TodoItem
    │   │   └── TodoList
    │   │       ├── CategoryFilter
    │   │       └── StatusFilter
    │   ├── constants
    │   ├── reducers
    │   ├── services
    │   ├── App.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   └── store.js
    ├── db.json
    └── index.html
```

## Tech

### Frontend

React.js + Vite

#### State Management

- useState
- Redux / Redux Thunk

#### Routing

- react-router-dom

#### HTTP Client

- Axios

#### Styling/UI Library

- CSS Modules
- Material UI

### Backend


#### Framework

- Express.js

#### Environment

- Node.js

#### Database

- MongoDB (Mongoose library)

#### Authentication

- JsonWebToken

#### Password-hashing

- bcrypt