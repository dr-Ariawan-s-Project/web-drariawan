export interface ButtonProps {
    id: string,
    type: "blue" | "red";
    label?: string;
    onClick?: () => void;
}
