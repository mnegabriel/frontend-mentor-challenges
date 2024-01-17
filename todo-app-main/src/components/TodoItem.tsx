type Props = {
    id: string | number
    checked: boolean;
    name: string;
    onDelete: (id: Props["id"]) => void;
    onChange: (id: Props["id"]) => void;
    onDragStart?: (id: Props["id"], event: DragEvent) => void
}

export const TodoItem = (props: Props) => (
    <div
        draggable="true"
        class="flex items-center gap-4 bg-white py-4 px-6 dark:bg-slate-800 "
        onDragStart={(event) => props.onDragStart?.(props.id, event)}
    >
        <input
            class="appearance-none border-slate-300 border checked:border-none checked:bg-gradient-to-tr checked:from-cyan-500 checked:to-purple-400 checked:relative checked:after:bg-check checked:after:absolute  checked:after:top-1/2 checked:after:left-1/2 checked:after:size-[10px] checked:after:bg-contain  checked:after:bg-center checked:after:bg-no-repeat checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 size-5 rounded-full"
            type="checkbox"
            id={`todo-${props.id}`}
            checked={props.checked}
            onChange={() => props.onChange(props.id)} />

        <span class={["flex-grow", ...(props.checked ? ["text-slate-400 dark:text-slate-500 line-through"] : ["dark:text-white"])].join(" ")}>{props.name}</span>

        <button
            class="bg-cross size-5 bg-center bg-no-repeat"
            onClick={() => props.onDelete(props.id)}
        >
            <span class="sr-only">Delete</span>
        </button>
    </div>
)
