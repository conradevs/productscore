import React, {useState, useEffect} from 'react'



const useValidation = (initState, validate, fn) => {
    const [values, saveValues] = useState(initState);
    const [errors, saveErrors] = useState({});
    const [submitForm, saveSubmitForm] = useState(false);
    
    useEffect(() => {
        if(submitForm) {
            const noErrors = Object.keys(errors).length === 0;
            if(noErrors) {
                fn(); // function executed in this component
            }
            saveSubmitForm(false);
        }
    },[errors]);

    // Function called when user writes something
    const handleChange = e => {
        saveValues({
            ...values,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const validationErrors = validate(values);
        saveErrors(validationErrors);
        saveSubmitForm(true);
    }

    const handleBlur = () => {
        const validationErrors = validate(values);
        saveErrors(validationErrors);
    }

    return {
        values,
        errors,
        handleSubmit,
        handleChange
    };
}
 
export default useValidation;