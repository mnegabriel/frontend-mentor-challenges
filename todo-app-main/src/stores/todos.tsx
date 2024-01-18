import { createLocalStore } from "../utils/local-storage"

const TODOS_STORE_KEY = "gd-todos-store" as const

export type Todo = {
  id: number | string
  name: string
  checked: boolean
}

export function createTodosLocalStorage() {
  const [todos, setTodos] = createLocalStore<Todo[]>(TODOS_STORE_KEY, [])

  function addTodo(name: string) {
    const newTodo: Todo = {
      id: Date.now(),
      name,
      checked: false,
    }

    setTodos((prev) => [...prev, newTodo])
  }

  function removeTodo(id: string | number) {
    setTodos((prev) => prev.filter((item) => item.id !== id))
  }

  function toggleTodo(id: string | number) {
    setTodos(
      (item) => item.id === id,
      "checked",
      (checked) => !checked,
    )
  }

  function removeAllCompleted() {
    setTodos((prev) => prev.filter((item) => !item.checked))
  }

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    removeAllCompleted,
    setTodos,
  }
}
