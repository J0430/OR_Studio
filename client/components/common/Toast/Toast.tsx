import { Toaster, toast } from "sonner";

export const notifySuccess = (message: string) =>
  toast.success(message, { duration: 3000 });

export const notifyError = (message: string) =>
  toast.error(message, { duration: 4000 });

const ToastMount = () => (
  <Toaster
    position="top-center"
    expand
    toastOptions={{
      style: {
        background: "var(--background-color)",
        color: "var(--text-color)",
        border: "1px solid var(--border-strong)",
        boxShadow: "0 10px 30px var(--shadow-color)",
        borderRadius: "18px"
      }
    }}
  />
);

export default ToastMount;
