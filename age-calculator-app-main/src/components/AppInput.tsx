type Props = {
    label?: string;
    state?: "valid" | "error";
    id: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AppInput = ({ label, id, state, value, onChange }: Props) => {
    return (
        <div className="field" data-state={state}>
            {label ? <label htmlFor={id}>{label}</label> : null}

            <input
                type="number"
                id={id}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}