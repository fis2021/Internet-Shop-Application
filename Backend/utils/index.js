const {hash, base64, validator} = require('./security')
const json = require('./json/comparison')

module.exports = {
    security : {hash, base64, validator},
    json : json
}