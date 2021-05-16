const addFunds = {
    "session_token" : "token",
    "action" : {
        "type" : "add",
        "amount" : 1.000
    }
}

const retrieveFunds = {
    "session_token" : "token",
    "action" : {
        "type" : "retrieve",
        "amount" : 1.000
    }
}

module.exports = {addFunds, retrieveFunds}