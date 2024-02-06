type Props = {
  id: string | number
  checked: boolean
  name: string
  onDelete: (id: Props["id"]) => void
  onChange: (id: Props["id"]) => void
}

export const TodoItem = (props: Props) => (
  <div
    data-todo-id={props.id}
    class="flex items-center gap-4 bg-white px-6 py-4 dark:bg-slate-800 "
  >
    <input
      class="size-5 appearance-none rounded-full border border-slate-300 checked:relative checked:border-none checked:bg-gradient-to-tr checked:from-cyan-500 checked:to-purple-400  checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:size-[10px]  checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:bg-check checked:after:bg-contain checked:after:bg-center checked:after:bg-no-repeat"
      type="checkbox"
      id={`todo-${props.id}`}
      checked={props.checked}
      onChange={() => props.onChange(props.id)}
    />

    <span
      class={[
        "flex-grow",
        ...(props.checked
          ? ["text-slate-400 line-through dark:text-slate-500"]
          : ["dark:text-white"]),
      ].join(" ")}
    >
      {props.name}
    </span>

    <button
      class="size-5 bg-cross bg-center bg-no-repeat"
      onClick={() => props.onDelete(props.id)}
    >
      <span class="sr-only">Delete</span>
    </button>
  </div>
)
