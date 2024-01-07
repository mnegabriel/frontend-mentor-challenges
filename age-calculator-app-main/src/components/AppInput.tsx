type Props = {
    label?: string;
    id: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AppInput = ({ label, id, value, onChange }: Props) => {
    return (
        <div className="field">
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