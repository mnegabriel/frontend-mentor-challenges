import { createSignal } from "solid-js";
import { TodoItem } from "./components/TodoItem"

type Todo = {
  id: number | string;
  name: string;
  checked: boolean
}
function App() {

  const [todos, setTodos] = createSignal<Todo[]>([])
  const [filter, setFilter] = createSignal<"all" | "active" | "completed">("all")

  function addTodo(e: SubmitEvent) {
    e.preventDefault()
    const formElement = e.target as HTMLFormElement
    const formData = new FormData(formElement)

    const { todoName } = Object.fromEntries(formData.entries()) as { todoName: string }


    const newTodo: Todo = {
      id: Date.now(),
      name: todoName,
      checked: false
    }

    setTodos(prev => [
      ...prev,
      newTodo
    ])

    formElement.reset()
  }

  function removeTodo(id: string | number) {
    setTodos(prev => prev.filter(item => item.id !== id))
  }

  function toggleTodo(id: string | number) {
    setTodos(prev => prev.map(item => {
      if (item.id !== id) return item

      return {
        ...item,
        checked: !item.checked
      }
    }))
  }

  function removeAllCompleted() {
    setTodos(prev => prev.filter(item => !item.checked))
  }

  const filteredTodos = () => {
    if (filter() === "active") return todos().filter(item => !item.checked)

    if (filter() === "completed") return todos().filter(item => item.checked)

    return todos()

  }



  return (
    <main class="min-h-screen bg-slate-200 dark:bg-slate-900 bg-mobile-light bg-no-repeat md:bg-desktop-light dark:bg-mobile-dark dark:md:bg-desktop-dark bg-contain">
      <div class="container mx-auto px-8 py-10">
        <h1 class="text-white uppercase tracking-[0.4em] font-semibold text-[2rem] mb-10">Todo</h1>

        <form class="mb-5 relative after:absolute after:size-5 after:border after:border-slate-300 after:rounded-full after:top-1/2 after:left-6 after:-translate-y-1/2" onsubmit={addTodo}>
          <input
            type="text"
            class="w-full py-4 pr-4 pl-16 rounded-md "
            placeholder="Create a new todo..."
            name="todoName"
          />
        </form>


        <div class="rounded-md overflow-hidden grid gap-[1px] bg-slate-300">

          {filteredTodos().map(item => (
            <TodoItem
              id={item.id}
              checked={item.checked}
              name={item.name}
              onDelete={id => removeTodo(id)}
              onChange={id => toggleTodo(id)}
            />
          ))}



          <div class="flex justify-between items-center gap-4 bg-white py-4 px-6">
            <span class="text-slate-400">{todos().filter(item => !item.checked).length} items left</span>

            <button class="text-slate-400 relative isolate before:-z-10 before:transition
            hover:before:bg-slate-100 hover:active:before:bg-slate-200 before:absolute before:left-1/2 before:top-1/2 before:w-[calc(100%+0.5rem)] before:h-[calc(100%+0.5rem)] before:-translate-y-1/2 before:-translate-x-1/2" onClick={() => removeAllCompleted()}>Clear completed</button>
          </div>

        </div>

        <div class="rounded-md overflow-hidden bg-white mt-5 py-4 px-6 flex justify-center gap-6 font-bold text-slate-500">
          <button class={filter() === 'all' ? "text-blue-500" : undefined} onClick={() => setFilter('all')}>All</button>

          <button class={filter() === 'active' ? "text-blue-500" : undefined} onClick={() => setFilter('active')}>Active</button>

          <button class={filter() === 'completed' ? "text-blue-500" : undefined} onClick={() => setFilter('completed')}>Completed</button>
        </div>

        <p class="text-gray-500 text-center font-bold mt-12">Drag and drop to reorder list</p>
      </div>
    </main>
  )
}

export default App
