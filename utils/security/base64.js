function decodeBase64(data) {
    const bufferedData = Buffer.from(data, 'base64')
    return bufferedData.toString('ascii')
}

module.exports = {
    decodeBase64 : decodeBase64
}