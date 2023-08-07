export interface ButtonProps {
    id: string,
    type: "blue" | "red";
    label?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}
