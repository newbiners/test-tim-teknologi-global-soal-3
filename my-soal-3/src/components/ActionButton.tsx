import React, { ReactNode, ButtonHTMLAttributes } from "react";

type buttonVariants = "violet" | "grey" | "blue" | string;

const ActionButton: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: buttonVariants;
    btnBorder?: boolean;
  }
> = ({ children, variant = "transparant", btnBorder = false, className, ...props }) => {
  const parseButtonVariant = (variant: buttonVariants) => {
    if (!btnBorder) {
      switch (variant) {
        case "violet":
          return "bg-violet-700 hover:bg-violet-500";
        case "grey":
          return "bg-gray-400 hover:bg-gray-300";
        case "blue":
          return "bg-blue-500 hover:bg-blue-400";
        default:
          return "bg-transparent"; 
      }
    } else {
      switch (variant) {
        case "violet":
          return "bg-transparent border-violet-700";
        case "grey":
          return "bg-transparent border-gray-400";
        case "blue":
          return "bg-transparent border-blue-500";
        default:
          return "bg-transparent border-black";
      }
    }
  };
  
  return (
    <button
      {...props}
      className={`${parseButtonVariant(
        variant
      )}  p-4 rounded-2xl ${className}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;