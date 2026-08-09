import { TextareaHTMLAttributes, forwardRef, useId } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, helperText, id, required, rows = 5, className = "", ...rest },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const helperId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-slate-800"
        >
          {label}
          {required && <span className="ml-0.5 text-red-600">*</span>}
        </label>

        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={[
            "w-full rounded-lg border bg-white px-3.5 py-2.5 text-base text-slate-900",
            "placeholder:text-slate-400 transition-colors duration-150 resize-y",
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

Textarea.displayName = "Textarea";