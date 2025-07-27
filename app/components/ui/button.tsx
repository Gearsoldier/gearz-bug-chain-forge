// app/components/ui/button.tsx
import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
