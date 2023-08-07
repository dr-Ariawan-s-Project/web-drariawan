export interface ButtonProps {
    id: string,
    type: "blue" | "red";
    label?: string;
    onClick?: () => void;
}

export interface InputProps {
    id: string,
    label?: string,
    value?: string,
    type?: string,
    placeholder?: string,
    onChange?: () => void
}
