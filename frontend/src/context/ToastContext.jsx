import { createContext, useContext, useState } from "react";
const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type="success", icon="check") => {
    setToast({
        show:true,
        message,
        type,
        icon,
    });
    setTimeout(() => {
        setToast({
            show:false,
            message:"",
            type:"success",
        });
    },4500);
  };

  return (
    <ToastContext.Provider value={{toast,showToast}}>
        {children}
    </ToastContext.Provider>
  );
}
export function useToast(){
    return useContext(ToastContext);
}
