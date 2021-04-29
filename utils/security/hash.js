const bcrypt = require("bcrypt")

/**
 * Async calculation of string hash
 * @param data : String
 * @param saltRounds : Number
 * @returns {Promise<*>}
 */
async function hashPassword(data, saltRounds = 10){
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(data, salt)
}

/**
 * Async comparison of hashed strings
 * @param hashRef
 * @param hashCmp
 * @returns {Promise<*>}
 */
async function compareHashes(hashRef, hashCmp){
    return await bcrypt.compare(hashRef, hashCmp)
}

module.exports = {
    hashPassword : hashPassword,
    compareHashes : compareHashes
}