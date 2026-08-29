import { useId } from "react";
import { cn } from "@/lib/utils";

export default function Input({
  className,
  label,
  id,
  type = "text",
  disabled = false,
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        disabled={disabled}
        className={cn(
          "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900",
          "placeholder:text-gray-400",
          "focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}
