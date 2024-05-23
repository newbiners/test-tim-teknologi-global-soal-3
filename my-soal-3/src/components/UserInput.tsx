import { ChangeEvent, Dispatch, InputHTMLAttributes } from "react";

const UserInput:React.FC<
InputHTMLAttributes<HTMLInputElement> & {
label: string;
placeholder?: string;
onChange: Dispatch<ChangeEvent<HTMLInputElement>>;
value: string;
}> = ({onChange,value,placeholder,label,...props}) => {
    return(
        <div className="flex flex-col w-full" {...props}>
            <label>{label}</label>
            <input placeholder={placeholder} type={label.toLocaleLowerCase()} value={value} onChange={(e) => onChange(e)} className="bg-transparent border-b-2 focus:outline-none border-slate-600"/>
        </div>
    );
}

export default UserInput;