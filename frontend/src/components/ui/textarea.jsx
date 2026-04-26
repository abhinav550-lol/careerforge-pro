import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    (<textarea
      className={cn(
        // Updated: rounded-2xl for consistency, bg-slate-50 for a soft feel
        "flex min-h-[120px] w-full rounded-2xl border-none bg-slate-50/50 px-4 py-4 text-sm font-medium text-slate-800 ring-offset-background placeholder:text-slate-400 leading-relaxed transition-all focus-visible:outline-none focus-visible:bg-white focus-visible:ring-8 focus-visible:ring-purple-600/5 focus-visible:border-purple-600/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Textarea.displayName = "Textarea"

export { Textarea }