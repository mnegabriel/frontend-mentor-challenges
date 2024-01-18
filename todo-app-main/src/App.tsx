import { createSignal } from "solid-js"
import { TodoItem } from "./components/TodoItem"

import { Todo, createTodosLocalStorage } from "./stores/todos"
import { createPreferencesLocalStorage } from "./stores/preferences"
import { DragAndDropZone } from "./components/DragAndDropZone"

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

  let draggedItem: Todo | null = null

  function onDrop(event: DragEvent) {
    event.preventDefault()

    if (draggedItem) {
      const updatedTodos = [...todosStorage.todos]
      const draggedIndex = updatedTodos.findIndex(
        (todo) => todo === draggedItem,
      )

      if (draggedIndex === -1) {
        draggedItem = null
        return
      }

      updatedTodos.splice(draggedIndex, 1)
      const target = event.target as HTMLElement
      const itemElement = target.closest(
        "[data-todo-id]",
      ) as HTMLDivElement | null

      if (!itemElement) {
        draggedItem = null
        return
      }

      const id = itemElement.dataset["todoId"]

      if (!id) {
        draggedItem = null
        return
      }

      const targetIndex = updatedTodos.findIndex((todo) => todo.id == id)
      const downardsIncrementer = draggedIndex > targetIndex ? 0 : 1

      updatedTodos.splice(targetIndex + downardsIncrementer, 0, draggedItem)

      todosStorage.setTodos(updatedTodos)

      draggedItem = null
    }
  }

  function dragStart(event: DragEvent | TouchEvent, id: number | string) {
    if (event.type === "dragstart" && "dataTransfer" in event) {
      event.dataTransfer?.setData("text/plain", "")
    }

    const todo = todosStorage.todos.find((todo) => todo.id === id)

    if (todo) draggedItem = todo
  }

  return (
    <div
      class={preferencesStorage.preferences.theme === "dark" ? "dark" : "light"}
    >
      <main class="min-h-screen bg-slate-200 bg-mobile-light bg-contain bg-no-repeat dark:bg-slate-900 dark:bg-mobile-dark md:bg-desktop-light dark:md:bg-desktop-dark">
        <div class="container mx-auto px-8 py-10">
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

          <DragAndDropZone
            class="grid gap-[1px] overflow-hidden rounded-md bg-slate-300 dark:bg-slate-700"
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
            onDragOver={(e) => e.preventDefault()}
            onDrop={(event) => onDrop(event)}
            onDragStart={(id, event) => dragStart(event, id)}
            footer={
              <div class="flex items-center justify-between gap-4 bg-white px-6 py-4 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                <span class="">
                  {!filterTodos("active").length
                    ? "All done!"
                    : filterTodos("active").length === 1
                      ? "1 item left"
                      : `${filterTodos("active").length} items left`}
                </span>

                <button
                  class="relative isolate before:absolute before:left-1/2 before:top-1/2 before:-z-10 before:h-[calc(100%+0.5rem)] before:w-[calc(100%+1rem)] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded before:transition hover:before:bg-slate-100 hover:active:before:bg-slate-200 dark:hover:before:bg-slate-700 dark:active:hover:before:bg-slate-600"
                  onClick={() => todosStorage.removeAllCompleted()}
                >
                  Clear completed
                </button>
              </div>
            }
          />

          <div class="mt-5 flex justify-center gap-6 overflow-hidden rounded-md bg-white px-6 py-4 font-bold text-slate-500 dark:bg-slate-800">
            {filterOptions.map((val) => (
              <button
                class={filter() === val ? "text-blue-500" : undefined}
                onClick={() => setFilter(val)}
              >
                {val[0].toUpperCase() + val.slice(1)}
              </button>
            ))}
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
