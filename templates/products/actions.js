const add = {
    "session_token" : "token",
    "action" : "add",
    "product" : {
        "name" : "name",
        "price" : 0,
        "quantity" : 0,
        "description" : "text",
    }
}

const edit = {
    "session_token" : "token",
    "product_uuid" : "uuid",
    "action" : "edit",
    "product" : {
        "name" : "new name",
        "price" : 0,
        "quantity" : 0,
        "description" : "new text",
    }
}

const remove = {
    "session_token" : "token",
    "action" : "remove",
    "product_uuid" : "uuid"
}

module.exports = {add, edit, remove}