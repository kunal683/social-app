module.exports.validateinput = (
    username,
    email,
    password,
    confirmpassword) => {
    const errors = {}
    if (username.trim === '') {
        errors.username = "username must not be empty"
    }
    if (email.trim === '') {
        errors.email = "email must not be empty"
    }
    else {
        const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regex)) {
            errors.email = "Enter a valid email id"
        }
    }

    if (password.trim === '') {
        errors.password = "Password cannot be empty"
    } else if (password != confirmpassword) {
        errors.confirmpassword = "Password must match"
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}
module.exports.validatelogininput = (
    username,
    password
) => {
    const errors = {}
    if (username.trim === '') {
        errors.username = "Username must not be empty"
    }
    if (password.trim === '') {
        errors.email = "Password must not be empty"
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}