import { TodoItem } from "./components/TodoItem"

function App() {

  const temp = [
    { id: 1, name: "Teste 1", checked: true },
    { id: 2, name: "Teste 2", checked: false },
    { id: 3, name: "Teste 3", checked: false },
  ]

  return (
    <main class="bg-slate-200 dark:bg-slate-900 bg-mobile-light bg-no-repeat md:bg-desktop-light dark:bg-mobile-dark dark:md:bg-desktop-dark bg-contain">
      <div class="container mx-auto px-8 py-10">
        <h1 class="text-white uppercase tracking-[0.4em] font-semibold text-[2rem] mb-10">Todo</h1>

        <form>
          <input
            type="text"
            class="w-full py-4 pr-4 pl-16 rounded-md mb-5"
            placeholder="Create a new todo..."
          />
        </form>


        <div class="rounded-md overflow-hidden grid gap-[1px] bg-slate-300">

          {temp.map(item => (
            <TodoItem
              id={item.id}
              checked={item.checked}
              name={item.name}
            />
          ))}

          <div class="flex justify-between items-center gap-4 bg-white py-4 px-6">
            <span class="text-slate-400">5 items left</span>

            <button class="text-slate-400 relative isolate before:-z-10 before:transition
            hover:before:bg-slate-100 hover:active:before:bg-slate-200 before:absolute before:left-1/2 before:top-1/2 before:w-[calc(100%+0.5rem)] before:h-[calc(100%+0.5rem)] before:-translate-y-1/2 before:-translate-x-1/2">Clear completed</button>
          </div>
        </div>

        <div class="rounded-md overflow-hidden bg-white mt-5 py-4 px-6 flex justify-center gap-6 font-bold text-slate-500">
          <button class="text-blue-500">All</button>

          <button>Active</button>

          <button>Completed</button>
        </div>

        <p class="text-gray-500 text-center font-bold mt-12">Drag and drop to reorder list</p>
      </div>
    </main>
  )
}

export default App
