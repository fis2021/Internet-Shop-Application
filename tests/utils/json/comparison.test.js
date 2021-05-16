const comparer = require('../../../utils/json/comparison')

test('Test json body comparer by values on simple objects => true', () => {
    const testObj = {
        "name" : "123"
    }
    const testRef = {
        "name" : "123"
    }
    expect(comparer.compareByValues(testObj, testRef)).toBe(true)
})

test('Test json body comparer by values on simple objects => false', () => {
    const testObj = {
        "name" : "123"
    }
    const testRef = {
        "name" : "My new value"
    }
    expect(comparer.compareByValues(testObj, testRef)).toBe(false)
})


test('Test json body comparer by values on nested objects => true', () => {
    const testObj = {
        "name" : {
            "new" : "word",
            "field" : {
                "value" : "value"
            }
        }
    }
    const testRef = {
        "name" : {
            "new" : "word",
            "field" : {
                "value" : "value"
            }
        }
    }
    expect(comparer.compareByValues(testObj, testRef)).toBe(true)
})

test('Test json body comparer by values on nested objects => false', () => {
    const testObj = {
        "name" : {
            "new" : "word",
            "field" : {
                "value" : "value"
            }
        }
    }
    const testRef = {
        "name" : {
            "new" : "word",
            "field" : {
                "value" : "key"
            }
        }
    }
    expect(comparer.compareByValues(testObj, testRef)).toBe(false)
})


test('Test json body comparer by values on empty objects => true', () => {
    const testObj = {}
    const testRef = {}
    expect(comparer.compareByValues(testObj, testRef)).toBe(true)
})


test('Test json body comparer by values on nested objects with mixed types => true', () => {
    const testObj = {
        "name" : {
            "new" : {},
            "field" : {
                "value" : 1.23
            }
        }
    }
    const testRef = {
        "name" : {
            "new" : {},
            "field" : {
                "value" : 1.23
            }
        }
    }
    expect(comparer.compareByValues(testObj, testRef)).toBe(true)
})


test('Test json body comparer by values on nested objects with mixed types => false', () => {
    const testObj = {
        "name" : {
            "new" : {},
            "field" : {
                "value" : []
            }
        }
    }
    const testRef = {
        "name" : {
            "new" : {["values"]: "key"},
            "field" : {
                "value" : 3123
            }
        }
    }
    expect(comparer.compareByValues(testObj, testRef)).toBe(false)
})



test('Test json body comparer by keys and value types on simple objects => true', () => {
    const testObj = {
        "name" : "123"
    }
    const testRef = {
        "name" : "my new name"
    }
    expect(comparer.compareByTypes(testObj, testRef)).toBe(true)
})

test('Test json body comparer by keys and value types on simple objects => false', () => {
    const testObj = {
        "name" : "123"
    }
    const testRef = {
        "name" : 1.23
    }
    expect(comparer.compareByTypes(testObj, testRef)).toBe(true)
})



test('Test json body comparer by keys and value types on nested objects => true', () => {
    const testObj = {
        "name" : {
            "key" : {
                "value" : 1123123.3,
                "othervalue" : ['array of something']
            }
        }
    }
    const testRef = {
        "name" : {
            "key" : {
                "value" : 1.23,
                "othervalue" : ['asdasd']
            }
        }
    }
    expect(comparer.compareByTypes(testObj, testRef)).toBe(true)
})


test('Test json body comparer by keys and value types on nested objects => false', () => {
    const testObj = {
        "name" : {
            "key" : {
                "value" : [],
                "othervalue" : [
                    1, 2, 3, 4
                ]
            }
        }
    }
    const testRef = {
        "name" : {
            "key" : {
                "value" : "String",
                "othervalue" : [
                    {1 : 2}, {3 : 4}
                ]
            }
        }
    }
    expect(comparer.compareByTypes(testObj, testRef)).toBe(false)
})


