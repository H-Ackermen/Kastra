import { createContext, useState } from "react";
import { toast } from 'react-toastify';

export const errorContext = createContext()

const ErrorContextProvider = ({children})=>{
    const [error,setError] = useState(null)
    const [validationErrors, setValidationErrors] = useState({})
    
    const clearErrors = () => {
        setError(null);
        setValidationErrors({});
    } 

    const handleApiError = (err) => {
        if(err.response){
            if(err.response.status === 400 && err.response.data.errors){
                setValidationErrors(err.response.data.errors);
                return;
            }
            const errorMessage = err.response.data.message || 'An error occurred';
            setError(errorMessage);
            toast.error(errorMessage);
        }
        else if(err.request){
            const networkError = 'Network error. Please check your connection';
            setError(networkError);
            toast.error(networkError);
        }
        else{
            const unexpectedError = 'An unexpected error occurred';
            setError(unexpectedError);
            toast.error(unexpectedError);
        }
        throw err;
    }

    const contextValues = {
        error,
        setError,validationErrors,setValidationErrors,handleApiError,clearErrors
    }

    return (
        <errorContext.Provider value = {contextValues}>
            {children}
        </errorContext.Provider>
    )
} 

export default ErrorContextProvider