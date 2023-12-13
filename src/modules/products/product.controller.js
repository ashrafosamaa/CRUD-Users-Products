import connection from "../../../DB/connection.js"

export const listProducts = (req, res, next)=>{
    const selectQuery = `SELECT name, description, price FROM tbl_products;`
    connection.execute(selectQuery, function(err, result, fields){
        if(err){
            return res.json({msg: "error", err})
        }
        if(result.length){
            return res.json(result)
        }
        return res.json({msg: "no data found"})
    })
}

export const lisProductMore = (req, res, next)=>{
    const selectQuery = `SELECT name, description, price FROM tbl_products WHERE price > 3000;`
    connection.execute(selectQuery, function(err, result, fields){
        if(err){
            return res.json({msg: "error", err})
        }
        if(result.length){
            return res.json(result)
        }
        return res.json({msg: "no data found"})
    })
}

export const deleteProduct = (req, res, next)=>{
    const {userID} = req.params //id el user
    const {name} = req.body
    const selectQuery = `SELECT * FROM tbl_products WHERE userID = ${userID};`
    const selectQueryName = `SELECT * FROM tbl_products WHERE name = '${name}';`
    const deleteQuery = `DELETE FROM tbl_products WHERE name = '${name}';`
    connection.execute(selectQuery, function(err, result, fields){
        if(err){
            return res.json({msg: "error", err})
        }
        if(!result.length){
            return res.json({msg: "you cannot delete this product or you don't added a product before"})
        }
        connection.execute(selectQueryName, function(err, result, fields){
            if(err){
                return res.json({msg: "error", err})
            }
            if(!result.length){
                return res.json({msg: "there is no product with name!"})
            }
            connection.execute(deleteQuery, function(err, result, fields){
                if(err){
                    return res.json({msg: "error", err})
                }
                if(!result.affectedRows){
                    return res.json({msg: "product doesn't deleted"})
                }
                return res.json({msg: "product deleted successfully"})
            })
        })
    })
}

export const updateProduct = (req, res, next)=>{
    const {userID} = req.params
    const {id, name, description, price} = req.body
    const selectQueryUser = `SELECT * FROM tbl_products WHERE userID = ${userID};`
    const selectQueryName = `SELECT * FROM tbl_products WHERE name = '${name}' AND id != ${id};`
    const updateQuery = `UPDATE tbl_products SET name = '${name}', description = '${description}', price = '${price}' WHERE id = ${id};`
    connection.execute(selectQueryUser, function(err, result, fields){
        if(err){
            return res.json({msg: "error", err})
        }
        if(!result.length){
            return res.json({msg: "you cannot update this product or you don't added a product before"})
        }
        connection.execute(selectQueryName, function(err, result, fields){
            if(err){
                return res.json({msg: "error", err})
            }
            if(result.length){
                return res.json({msg: "this product name added before"})
            }
            connection.execute(updateQuery, function(err, result, fields){
                if(err){
                    return res.json({msg: "error", err})
                }
                if(!result.affectedRows){
                    return res.json({msg: "product doesn't updated"})
                }
                return res.json({msg: "product updated successfully"})
            })
        })
    })
}

export const addProduct = (req, res, next)=>{
    const {name, description, price, userID} = req.body
    const addQuery = `INSERT INTO tbl_products (name, description, price, userID) VALUES
    ('${name}', '${description}', ${price}, ${userID});`
    const selectQueryName = `SELECT * FROM tbl_products WHERE name = '${name}';`
    connection.execute(selectQueryName, (err, result, fields)=>{
        if(err){
            return res.json({msg: "error", err})
        }
        if(result.length){
            return res.json({msg: "this product name added before"})
        }
        connection.execute(addQuery, (err, result, fields)=>{
            if(err){
                return res.json({msg: "error", err})
            }
            if(!result.affectedRows){
                return res.json({msg: "this product dosn't added"})
            }
            return res.json({msg: "this product added successfully"})
        })
    })
}
