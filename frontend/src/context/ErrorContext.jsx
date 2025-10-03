import { createContext, useState } from "react";

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
            setError(err.response.data.message || 'An error occurred')
        }
        else if(err.request){
            setError('Network error. Please check your connection')
        }
        else{
            setError('An unexpected error occurred')
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