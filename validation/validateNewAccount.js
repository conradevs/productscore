export default function validateNewAccount(values) {
    let errors = {};

    // Validate user name
    if(!values.name) {
        errors.name = 'Name field is required'
    }
    // validate email
    if(!values.email) {
        errors.email = 'Your email is required'
    } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) {
        errors.email = "email not valid"
    }
    // validate password
    if(!values.password) {
        errors.password = 'your password is required'
    } else if (values.password.length < 6) {
        errors.password = 'your password must have at least 6 characters';
    }

    return (errors);
}