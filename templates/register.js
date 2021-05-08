const newCustomerJSON = {
    "user-type" : "customer",
    "user" : {
        "name" : "name",
        "surname" : "surname",
        "email" : "email",
        "password" : "encrypted password with base64"
    }
}


const newSellerJSON = {
    "user-type" : "seller",
    "user" : {
        "company-name" : "company name",
        "address" : "address",
        "phone" : "phone",
        "email" : "email",
        "password" : "encrypted password with base64"
    }
}

module.exports = {
    customerTemplate : newCustomerJSON,
    sellerTemplate   : newSellerJSON
}