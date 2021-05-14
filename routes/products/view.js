const express = require('express')
const router = express.Router()

const database = require('../../database')

router.get('/', async function(req, res, next) {
    const options = req.query
    let optionsFlag = Array()
    optionsFlag['product_name'] = !!options.name
    optionsFlag['product_price'] = !!options.price
    optionsFlag['product_category'] = !!options.category
    optionsFlag['product_unique_register_id'] = !!options.id
    optionsFlag['limit'] = options.limit === undefined ? "All" : options.limit
    optionsFlag['company'] = options.company === undefined ? false : options.company
    optionsFlag['order'] = options.order === undefined ? "ASC" : "DES"

    const formatToArray = (entity, field_name, type = String) => {
        if(entity === undefined) return ""
        if(Array.isArray(entity)){
            return entity.map(e => field_name.concat(" = ", typeof e === "string" ? `'${e}'` : type(e))).join(" OR ")
        }
        return field_name.concat(" = ", typeof entity === "string" ? `'${entity}'` : type(entity))
    }

    const selectStmt = `SELECT product_unique_register_id,
                               seller_company_name,
                               product_price,
                               product_quantity,
                               product_category,
                               product_description,
                               product_image_data
                        FROM ${database.Tables.products}
                        ${optionsFlag['company'] === false ? "" : `INNER JOIN ${database.Tables.sellers} ON (product_company_owner_uuid = seller_unique_register_id) `}
                        ${optionsFlag.filter(x => x === false).length < 4 ? " WHERE " : " "}
                        ${optionsFlag['product_name'] ? formatToArray(options.name, "product_name") : " "}
                        ${optionsFlag['product_name'] ? " AND " : " "}
                        ${optionsFlag['product_category'] ? formatToArray(options.category, "product_category") : " "}
                        ${optionsFlag['product_category'] ? " AND " : " "}
                        ${optionsFlag['product_price'] ? formatToArray(options.price, "product_price", Number) : " "}
                        ${optionsFlag['product_price'] ? " AND " : " "}
                        ${optionsFlag['product_unique_register_id'] ? formatToArray(options.id, "product_unique_register_id") : " "}
                        ${optionsFlag['company'] ? formatToArray(options.company, "seller_company_name") : " "}
                        ${optionsFlag['limit'] === "All" ? "" : "LIMIT ".concat(optionsFlag['limit'])};`
    
    try {
        const dbResponse = await database.query(selectStmt)
        const products = dbResponse.rows

        const obj = {
            "numberOfProducts" : Object.keys(products).length,
            "filter" : {
                "id" : optionsFlag['product_unique_register_id'] ? options.id : "Any",
                "name" : optionsFlag['product_name'] ? options.name : "Any",
                "price" : optionsFlag['product_price'] ? options.price : "Any",
                "category" : optionsFlag['product_category'] ? options.category : "Any",
                "company_name" : optionsFlag['company'] ? options.company : "Any"
            },
            "products" : products.map(e => {
                return {
                    "id" : e.product_unique_register_id,
                    "company_name" : e.seller_company_name,
                    "name" : e.product_name,
                    "price" : e.product_price,
                    "quantity" : e.product_quantity,
                    "category" : e.product_category,
                    "description" : e.product_description,
                    "image" : e.product_image_data.toString('base64'),
                }
            })
        }
        res.json(obj)
    } catch (e) {
        console.error(e)
        res.status(200).json({})
    }
})

module.exports = router
