
const url = "localhost:3000"

export const API = {
    login : url.concat("/api/auth/login"),
    logout : url.concat("/api/auth/logout"),
    register : url.concat("/api/auth/register")
}

export function LoginFormData(email, password) {
    return {
        "user" : {
            "email" : email,
            "password" : btoa(password)
        }
    }
}

export function RegisterNewCustomer(name, surname, email, password) {
    return {
        "user-type" : "customer",
        "user" : {
            "name" : name,
            "surname" : surname,
            "email" : email,
            "password" : btoa(password)
        }
    }
} 

export function RegisterNewSeller(companyName, address, phone, email, password){
    return {
        "user-type" : "seller",
        "user" : {
            "company-name" : companyName,
            "address" : address,
            "phone" : phone,
            "email" : email,
            "password" : btoa(password)
        }
    }
}