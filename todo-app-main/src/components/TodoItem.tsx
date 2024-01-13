import crossImg from "../assets/images/icon-cross.svg"

type Props = {
    id: string | number
    checked: boolean;
    name: string;
}

export const TodoItem = ({ id, name, checked }: Props) => (
    <div class="flex items-center gap-4 bg-white py-4 px-6">
        <input class="appearance-none border-slate-300 border checked:border-none checked:bg-gradient-to-tr checked:from-cyan-500 checked:to-purple-400 checked:relative checked:after:bg-check checked:after:absolute  checked:after:top-1/2 checked:after:left-1/2 checked:after:size-[10px] checked:after:bg-contain  checked:after:bg-center checked:after:bg-no-repeat checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 size-5 rounded-full" type="checkbox" id={`todo-${id}`} checked={checked} />

        <span class="flex-grow">{name}</span>

        <button class="bg-cross size-5 bg-center  bg-no-repeat">
            <span class="sr-only">Delete</span>
        </button>
    </div>
)
