const arraysEqual = function (a, b) {
    return a.every((val, index) => val === b[index]) &&
        a.length === b.length
}

/**
 * Compare JSON objects by keys and values
 * @param refObj
 * @param cmpObj
 * @returns {boolean}
 */
function compareByValues(refObj, cmpObj) {
    return arraysEqual(Object.keys(refObj), Object.keys(cmpObj)) &&
            arraysEqual(Object.values(refObj), Object.values(cmpObj))
}


/**
 * Compare JSON objects by keys and types of values
 * @param refObj
 * @param cmpObj
 * @returns {boolean}
 */
function compareByTypes(refObj, cmpObj) {
    const refObjValuesTypes = Object.values(refObj).map((a) => typeof a)
    const cmpObjValuesTypes = Object.values(cmpObj).map((a) => typeof a)

    return arraysEqual(Object.keys(refObj), Object.keys(cmpObj)) &&
            arraysEqual(refObjValuesTypes, cmpObjValuesTypes)
}

module.exports = {
    compareByTypes,
    compareByValues
}