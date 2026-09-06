import { InputHTMLAttributes, forwardRef, useId } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, required, className = "", ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-slate-800">
          {label}
          {required && <span className="ml-0.5 text-red-600">*</span>}
        </label>

        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={[
            "h-11 w-full rounded-lg border bg-white px-3.5 text-base text-slate-900",
            "placeholder:text-slate-400 transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-offset-1",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-300 focus:border-blue-600 focus:ring-blue-600",
            "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        />

        {error ? (
          <p id={errorId} className="text-sm text-red-600">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-sm text-slate-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";