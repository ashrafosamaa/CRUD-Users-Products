import connection from "../../../DB/connection.js"

export const listUsers = (req, res, next)=>{
    const selectQuery = `SELECT name, email, age FROM tbl_users;`
    connection.execute(selectQuery, function(err, result, fields){
        if(err){
            return res.json({msg: "error", err})
        }
        if(result.length){
            return res.json(result)
        }
        return res.json({msg: "No Data Found", result})
    })
}

export const listUserBya = (req, res, next)=>{
    const selectQueryBy_a = `SELECT name, email, age FROM tbl_users WHERE name LIKE 'a%' AND age < 30;`
    connection.execute(selectQueryBy_a, function(err, result, fields){
        if(err){
            return res.json({msg: "error", err})
        }
        if(result.length){
            return res.json(result)
        }
        return res.json({msg: "not found"})
    })
}

export const searchUserByID = (req, res, next)=>{
    const {id} = req.params
    const selectQueryByID = `SELECT id, name, email, age FROM tbl_users WHERE id IN (${id})`
    connection.execute(selectQueryByID, function(err, result, fields){
        if(err){
            return res.json({msg: "error", err})
        }
        if(result.length){
            return res.json(result)
        }
        return res.json({msg: "not found"})
    })
}

export const deleteUser = (req, res, next)=>{
    const {id} = req.params
    const deleteQuery = `DELETE FROM tbl_users WHERE id = ${id}`
    connection.execute(deleteQuery, function(err, result, fields){
        if(err){
            return res.json({msg: "error", err})
        }
        if(!result.affectedRows){
            return res.json({msg:"User deleting failed", status: 400})
        }
        return res.json({msg:"User deleted successfully", status: 200})
    })
}

export const usersProducts = (req, res, next)=>{
    const selectQuery =`SELECT tbl_users.name AS User, tbl_users.email, tbl_products.name AS Product, tbl_products.description, tbl_products.price FROM 
    tbl_users INNER JOIN tbl_products ON tbl_users.id = tbl_products.userID`
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

export const updateUser = (req, res, next)=>{
    const {id, name, email, password, age} = req.body
    const updateQuery = `UPDATE tbl_users SET name = '${name}', email = '${email}',
                        password = '${password}', age = ${age} WHERE id = ${id};`
    const selectQueryByEmail = `SELECT * FROM tbl_users WHERE email = '${email}' AND id != ${id};`
    connection.execute(selectQueryByEmail, function(err, result, fields){
        if(err){
            return res.json({msg: "Error", err})
        }
        if(result.length){
            return res.json({msg: "email already used before", status: 400})
        }
        connection.execute(updateQuery, function(err, result, fields){
            if(err){
                return res.json({msg: "Error", err})
            }
            if(!result.affectedRows){
                return res.json({msg:"User updating failed", status: 400})
            }
            return res.json({msg:"User updated successfully", status: 200})
        })
    })
}

export const addUser = (req, res, next)=>{
    const {name , email, password, age} = req.body
    const selectQuery = `SELECT * FROM tbl_users WHERE email = '${email}';`
    const insertQuery = `INSERT INTO tbl_users (name, email, password, age)
                        VALUES ('${name}', '${email}', '${password}', ${age});`
    connection.execute(selectQuery, function(err, result, fields) {
        if (err) {
            return res.json({ msg: "error", err })
        }
        if (result.length) {
            return res.json({ msg: "email alredy used", status: 400 })
        }
        connection.execute(insertQuery, function(err, result, fields){
            if(err){
                return res.json({msg: "error", err})
            }
            if(!result.affectedRows){
                return res.json({msg: "user not added", status: 400})
            }
            return res.json({msg: "user added", status: 200})
        })
    })
}