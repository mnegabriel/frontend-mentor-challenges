import { createSignal } from "solid-js";
import { TodoItem } from "./components/TodoItem"

import { createTodosLocalStorage } from "./stores/todos"
import { createPreferencesLocalStorage } from "./stores/preferences"

function App() {
  const todosStorage = createTodosLocalStorage()
  const preferencesStorage = createPreferencesLocalStorage()


  const filterOptions = ["all", "active", "completed"] as const

  type FilterValue = typeof filterOptions[number]

  const [filter, setFilter] = createSignal<FilterValue>("all")

  function handleFormSubmit(e: SubmitEvent) {
    e.preventDefault()
    const formElement = e.target as HTMLFormElement
    const formData = new FormData(formElement)

    const { todoName } = Object.fromEntries(formData.entries()) as { todoName: string }

    todosStorage.addTodo(todoName)

    formElement.reset()
  }

  const filterTodos = (filterValue: FilterValue) => {
    if (filterValue === "active") return todosStorage.todos.filter(item => !item.checked)

    if (filterValue === "completed") return todosStorage.todos.filter(item => item.checked)

    return todosStorage.todos
  }

  return (
    <div class={preferencesStorage.preferences.theme === "dark" ? "dark" : "light"}>
      <main class="min-h-screen bg-slate-200 dark:bg-slate-900 bg-mobile-light bg-no-repeat md:bg-desktop-light dark:bg-mobile-dark dark:md:bg-desktop-dark bg-contain">
        <div class="container mx-auto px-8 py-10">
          <header class="flex justify-between items-center mb-10">
            <h1 class="text-white uppercase tracking-[0.4em] font-semibold text-[2rem]">Todo</h1>

            <button
              class={[
                "size-5 bg-contain",
                preferencesStorage.preferences.theme === "light" ? "bg-sun" : "bg-moon",
              ].join(" ")}
              onClick={() => preferencesStorage.toggleTheme()}
            >
              <div class="sr-only">Toggle light/dark mode</div>
            </button>
          </header>

          <form class="mb-5 relative after:absolute after:size-5 after:border after:border-slate-300 after:rounded-full after:top-1/2 after:left-6 after:-translate-y-1/2" onsubmit={handleFormSubmit}>
            <input
              type="text"
              class="w-full py-4 pr-4 pl-16 rounded-md "
              placeholder="Create a new todo..."
              name="todoName"
            />
          </form>

          <div class="rounded-md overflow-hidden grid gap-[1px] bg-slate-300">
            {filterTodos(filter()).map(item => (
              <TodoItem
                id={item.id}
                checked={item.checked}
                name={item.name}
                onDelete={id => todosStorage.removeTodo(id)}
                onChange={id => todosStorage.toggleTodo(id)}
              />
            ))}

            <div class="flex justify-between items-center gap-4 bg-white py-4 px-6">
              <span class="text-slate-400">
                {!filterTodos('active').length
                  ? "All done!"
                  : filterTodos('active').length === 1
                    ? "1 item left"
                    : `${filterTodos('active').length} items left`
                }
              </span>

              <button
                class="text-slate-400 relative isolate before:-z-10 before:transition hover:before:bg-slate-100 hover:active:before:bg-slate-200 before:absolute before:left-1/2 before:top-1/2 before:w-[calc(100%+0.5rem)] before:h-[calc(100%+0.5rem)] before:-translate-y-1/2 before:-translate-x-1/2"
                onClick={() => todosStorage.removeAllCompleted()}
              >
                Clear completed
              </button>
            </div>
          </div>

          <div class="rounded-md overflow-hidden bg-white mt-5 py-4 px-6 flex justify-center gap-6 font-bold text-slate-500">
            {filterOptions.map(val => (
              <button
                class={filter() === val ? "text-blue-500" : undefined}
                onClick={() => setFilter(val)}
              >
                {val[0].toUpperCase() + val.slice(1)}
              </button>
            ))}
          </div>

          <p class="text-gray-500 text-center font-bold mt-12">Drag and drop to reorder list</p>
        </div>
      </main>
    </div>
  )
}

export default App
