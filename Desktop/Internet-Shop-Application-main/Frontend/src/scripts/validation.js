export function validatePassword(password){
    const re = /^[0-9a-zA-Z!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]{8,32}$/
    return typeof password === "string" && re.test(password)
}

export function validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,100}))$/
    return typeof email === "string" && re.test(email)
}