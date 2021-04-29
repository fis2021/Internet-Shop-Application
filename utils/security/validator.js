/**
 * Return true if password constains an upper letter, an lower letter, a digit and a special character.
 * @param password
 * @returns {boolean}
 */
function validatePassword(password){
    const re = /^[0-9a-zA-Z!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]{8,32}$/
    return typeof password === "string" && re.test(password)
}


/**
 * Checks if a string is email
 * @param email
 * @returns {boolean}
 */
function validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,100}))$/
    return typeof email === "string" && re.test(email)
}


/**
 * Checks if string is a valid name/surname
 * @param name
 * @returns {boolean}
 */
function validateName(name){
    const re = /^[a-zA-Z]{1,50}$/
    return typeof name === "string" && re.test(name)
}


/**
 * Checks if string is a valid name(ex. street name, company name). Allowed chars: upper/lower letters, numbers, space, backslash, period.
 * @param otherName
 * @param length (optional)
 * @returns {boolean}
 */
function validateOtherName(otherName, length = 50) {
    const re = /^[a-zA-Z0-9 /.]+$/
    return typeof otherName === "string" && re.test(otherName) && otherName.length <= length
}

module.exports = {
    validatePassword : validatePassword,
    validateEmail : validateEmail,
    validateName : validateName,
    validateOtherName : validateOtherName
}

