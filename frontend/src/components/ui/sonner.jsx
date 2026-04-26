import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    (<Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            // Updated: rounded-2xl, premium shadow, and subtle border logic
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-900 group-[.toaster]:border-slate-100 group-[.toaster]:shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-[.toaster]:rounded-2xl group-[.toaster]:p-4",
          description: "group-[.toast]:text-slate-500 group-[.toast]:font-medium group-[.toast]:text-xs",
          actionButton:
            // Updated: Signature CareerForge Purple for actions
            "group-[.toast]:bg-purple-600 group-[.toast]:text-white group-[.toast]:font-bold group-[.toast]:rounded-xl",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500 group-[.toast]:font-bold group-[.toast]:rounded-xl",
          // Added: Specific styling for success/error icons to match purple theme
          success: "group-[.toast]:text-purple-600",
          error: "group-[.toast]:text-red-500",
        },
      }}
      {...props} />)
  );
}

export { Toaster }