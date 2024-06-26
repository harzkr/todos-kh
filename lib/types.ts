type Todo = {
  id: string;
  details: string;
  done: boolean;
  name: string;
};

interface TodoBody {
  name: string;
  details: string;
  done: boolean;
}

interface TodosResponse {
  data: Todo[];
  string: string;
  error_message?: string;
}

interface LoginBody {
  username: string;
  password: string;
}

interface LoginResponse {
  data: string;
  string: string;
  error_message?: string;
}

export type {
  Todo,
  TodoBody as TodoBodyType,
  TodosResponse as TodosResponseType,
  LoginBody as LoginBodyType,
  LoginResponse as LoginResponseType,
};
