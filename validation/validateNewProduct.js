export default function validateNewProduct(values) {
    let errors = {};

    // Validate product name
    if(!values.name) {
        errors.name = 'Name field is required'
    }
    // validate company
    if(!values.company) {
        errors.company = 'Company field is required'
    }
    // validate url
    if(!values.url) {
        errors.url = 'Product URL is required';
    } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(values.url) ) {
        errors.url = 'Not valid URL'
    }

    // validate description
    if(!values.description) {
        errors.description = 'Add a description for your product'
    }

    return (errors);
}