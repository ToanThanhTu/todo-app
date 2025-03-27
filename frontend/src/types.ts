export interface User {
  id: string
  username: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoggedUser {
  token: string
  user: User
}

export interface Category {
  id: string
  name: string
}

export interface NewCategory {
  name: string
}

export interface TodoItem {
  id: string
  content: string
  category: Category
  status: Status
}

export interface NewTodoItem {
  content: string
  categoryId: Category["id"]
  status: Status
}

export enum Status {
  ACTIVE = "Active",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export interface Filter {
  category: Category["id"]
  status: StatusFilterSelect
}

export enum StatusFilterSelect {
  ALL = "All",
  ACTIVE = "Active",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export interface Contact {
  id: string
  name: string
  display: string
  url: string
}

export interface ContactFormModel {
  name: string
  email: string
  message: string
}
