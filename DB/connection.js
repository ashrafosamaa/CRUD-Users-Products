import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
    database: "route",
    host: "localhost",
    user: "root",
    password: ""
})

export default connection