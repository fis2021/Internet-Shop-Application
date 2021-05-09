function decodeBase64(data) {
    if(data === undefined || typeof data !== "string") return undefined

    const bufferedData = Buffer.from(data, 'base64')
    return bufferedData.toString('ascii')
}

module.exports = {
    decodeBase64 : decodeBase64
}