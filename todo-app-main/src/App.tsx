import { createSignal } from "solid-js"
import { TodoItem } from "./components/TodoItem"

import { createTodosLocalStorage } from "./stores/todos"
import { createPreferencesLocalStorage } from "./stores/preferences"

import { SortableVerticalList } from "./components/SortableVerticalList"

function App() {
  const todosStorage = createTodosLocalStorage()
  const preferencesStorage = createPreferencesLocalStorage()

  const filterOptions = ["all", "active", "completed"] as const

  type FilterValue = (typeof filterOptions)[number]

  const [filter, setFilter] = createSignal<FilterValue>("all")

  function handleFormSubmit(e: SubmitEvent) {
    e.preventDefault()
    const formElement = e.target as HTMLFormElement
    const formData = new FormData(formElement)

    const { todoName } = Object.fromEntries(formData.entries()) as {
      todoName: string
    }

    todosStorage.addTodo(todoName)

    formElement.reset()
  }

  const filterTodos = (filterValue: FilterValue) => {
    if (filterValue === "active")
      return todosStorage.todos.filter((item) => !item.checked)

    if (filterValue === "completed")
      return todosStorage.todos.filter((item) => item.checked)

    return todosStorage.todos
  }

  function handleSort(from: number, to: number) {
    const updatedItems = todosStorage.todos.slice()
    updatedItems.splice(to, 0, ...updatedItems.splice(from, 1))
    todosStorage.setTodos(updatedItems)
  }

  return (
    <div
      class={preferencesStorage.preferences.theme === "dark" ? "dark" : "light"}
    >
      <main class="min-h-screen bg-slate-200 bg-mobile-light bg-contain bg-no-repeat dark:bg-slate-900 dark:bg-mobile-dark md:bg-desktop-light dark:md:bg-desktop-dark">
        <div class="mx-auto max-w-screen-sm px-8 py-10">
          <header class="mb-10 flex items-center justify-between">
            <h1 class="text-[2rem] font-semibold uppercase tracking-[0.4em] text-white">
              Todo
            </h1>

            <button
              class={[
                "size-5 bg-contain",
                preferencesStorage.preferences.theme === "light"
                  ? "bg-sun"
                  : "bg-moon",
              ].join(" ")}
              onClick={() => preferencesStorage.toggleTheme()}
            >
              <div class="sr-only">Toggle light/dark mode</div>
            </button>
          </header>

          <form
            class="relative mb-5 after:absolute after:left-6 after:top-1/2 after:size-5 after:-translate-y-1/2 after:rounded-full after:border after:border-slate-300"
            onsubmit={handleFormSubmit}
          >
            <input
              type="text"
              class="w-full rounded-md py-4 pl-16 pr-4 dark:bg-slate-800 dark:text-white"
              placeholder="Create a new todo..."
              name="todoName"
            />
          </form>

          <div class="grid gap-[1px] overflow-hidden rounded-md bg-slate-300 dark:bg-slate-700">
            <SortableVerticalList
              class="grid gap-[1px]"
              overlayClass={
                preferencesStorage.preferences.theme === "dark"
                  ? "dark"
                  : "light"
              }
              items={filterTodos(filter())}
              itemComponent={(todo) => (
                <TodoItem
                  id={todo.id}
                  checked={todo.checked}
                  name={todo.name}
                  onDelete={(id) => todosStorage.removeTodo(id)}
                  onChange={(id) => todosStorage.toggleTodo(id)}
                />
              )}
              onDragEnd={({ fromIndex, toIndex }) =>
                handleSort(fromIndex, toIndex)
              }
            />

            <div class="flex justify-center gap-6 bg-white px-6 py-4 font-bold text-slate-500 dark:bg-slate-800">
              {filterOptions.map((val) => (
                <button
                  class={filter() === val ? "text-blue-500" : undefined}
                  onClick={() => setFilter(val)}
                >
                  {val[0].toUpperCase() + val.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <p class="mt-12 text-center font-bold text-gray-500">
            Drag and drop to reorder list
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
