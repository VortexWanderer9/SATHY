import { useId } from "react";
import { cn } from "@/lib/utils";

export default function Textarea({
  className,
  label,
  id,
  rows = 4,
  disabled = false,
  ...props
}) {
  const generatedId = useId();
  const textareaId = id || generatedId;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        disabled={disabled}
        className={cn(
          "w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900",
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
