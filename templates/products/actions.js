const add = {
    "session_token" : "token",
    "product" : {
        "name" : "name",
        "price" : "price",
        "quantity" : "quantity",
        "description" : "text",
    }
}

const edit = {
    "session_token" : "token",
    "product_uuid" : "uuid",
    "product" : {
        "name" : "new name",
        "price" : "new price",
        "quantity" : "new quantity",
        "description" : "new text",
    }
}

const remove = {
    "session_token" : "token",
    "product_uuid" : "uuid"
}

module.exports = {add, edit, remove}