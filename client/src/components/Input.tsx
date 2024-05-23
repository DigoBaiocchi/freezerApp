import { SetStateAction, useState } from "react";

type InputProps = {
    inputName: string;
};

export default function Input({ inputName }: InputProps) {
    const [inputValue, setInputValue] = useState(inputName);

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setInputValue(e.target.value);
    };

    return (
        <input type="text" value={inputValue} onChange={handleChange} />
    );
}