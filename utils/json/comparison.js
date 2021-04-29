const arraysEqual = function (a, b) {
    return a.every((val, index) => val === b[index]) &&
        a.length === b.length
}

const isObject = val => typeof val === 'object' && !Array.isArray(val);


/**
 * Get all JSON objects key or values as array
 */
function getObjectFields(obj, getter = "key") {
    const paths = (obj = {}) => {
        return Object.entries(obj)
            .reduce((product, [key, value]) =>
            {
                return isObject(value) ?
                    product.concat(paths(value))
                    : product.concat(getter === "key" ? key : value)
            }, []);
    }
    return paths(obj);
}


/**
 * Compare JSON objects by keys and values
 * @param refObj
 * @param cmpObj
 * @returns {boolean}
 */
function compareByValues(refObj, cmpObj) {
    return arraysEqual(getObjectFields(refObj, "key"), getObjectFields(cmpObj, "key")) &&
            arraysEqual(getObjectFields(refObj, "value"), getObjectFields(cmpObj, "value"))
}


/**
 * Compare JSON objects by keys and types of values
 * @param refObj
 * @param cmpObj
 * @returns {boolean}
 */
function compareByTypes(refObj, cmpObj) {
    const refObjValuesTypes = getObjectFields(refObj, "value").map((a) => typeof a)
    const cmpObjValuesTypes = getObjectFields(cmpObj, "value").map((a) => typeof a)

    return arraysEqual(Object.keys(refObj), Object.keys(cmpObj)) &&
            arraysEqual(refObjValuesTypes, cmpObjValuesTypes)
}

module.exports = {
    compareByTypes,
    compareByValues
}