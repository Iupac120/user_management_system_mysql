const mysql = require('mysql')
const path = require('path')
const pool = mysql.createPool({
    connectionLimit: 100,
    host           : process.env.DB_HOST,
    user           : process.env.DB_USER,
    password       : process.env.DB_PASSWORD,
    database       : process.env.DB_NAME
})

const getAllUsers = (req,res) => {
    pool.getConnection((err,connection) => {
        if (err) throw err
        console.log('connected at' + connection.threadId)
        //using the connection
        connection.query('SELECT * FROM user',(err, result) => {
            connection.release()
            if (!err){
                res.render('index',{result})
                console.log({result})
            }else{
                console.log(err)
            }
                console.log('display data in the table\n',result)
        })
    })
}
const findUser = (req,res) => {
    pool.getConnection((err,connection) => {
        if (err) throw err
        console.log('connected at' + connection.threadId)

        let searchName = req.body.search
        //using the connection
        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?',['%' + searchName + '%','%' + searchName + '%'],(err, result) => {
            connection.release()
            if (!err){
                res.render('index',{result})
            }else{
                console.log(err)
            }
                console.log('display data in the table\n',result)
        })
    })
}
const getNewUserForm = (req,res) => {
    res.render('add-user')
}
const addUser = (req,res) => {
    const {first_name, last_name, enail, phone, comment} = req.body
    pool.getConnection((err,connection) => {
        if (err) throw err
        console.log('connected at' + connection.threadId)

        //using the connection
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, enail = ?, phone = ?, comment = ?',[first_name,last_name,enail,phone,comment],(err, result) => {
            connection.release()
            if (!err){
                res.render('add-user',{alert: 'user added successfully.'})
            }else{
                console.log(err)
            }
                console.log('display data in the table\n',result)
        })
    })
}

const getEditUser = (req,res) => {
    pool.getConnection((err,connection) => {
        if (err) throw err
        console.log('edit')
        console.log('connected at' + connection.threadId)
        //using the connection
        connection.query('SELECT * FROM user WHERE id = ?',[req.params.id],(err, result) => {
            connection.release()
            if (!err){
                res.render('edit-user',{result})
            }else{
                console.log(err)
            }
                console.log('display data in the table\n',result)
        })
    })

}
const updateUser = (req,res) => {
    const {first_name, last_name, enail, phone, comment} = req.body
    pool.getConnection((err,connection) => {
        if (err) throw err
        console.log('edit')
        console.log('connected at' + connection.threadId)
        //using the connection
        connection.query('UPDATE user SET first_name = ?, last_name = ?, enail = ?, phone = ?, comment =? WHERE id = ?',[first_name, last_name, enail, phone, comment, req.params.id],(err, result) => {
            connection.release()
            if (!err){
                pool.getConnection((err,connection) => {
                    if (err) throw err
                    console.log('edit')
                    console.log('connected at' + connection.threadId)
                    //using the connection
                    connection.query('SELECT * FROM user WHERE id = ?',[req.params.id],(err, result) => {
                        connection.release()
                        if (!err){
                            res.render('view-user',{result})
                        }else{
                            console.log(err)
                        }
                            console.log('display data in the table\n',result)
                    })
                })
            
            }else{
                console.log(err)
            }
                console.log('display data in the table\n',result)
        })
    })

}

const deleteUser = (req,res) => {
    pool.getConnection((err,connection) => {
        if (err) throw err
        console.log('edit')
        console.log('connected at' + connection.threadId)
        //using the connection
        connection.query('DELETE FROM user WHERE id = ?',[req.params.id],(err, result) => {
            connection.release()
            if (!err){
                res.redirect('/')
            }else{
                console.log(err)
            }
                console.log('display data in the table\n',result)
        })
    })

}

const viewAllUser = (req,res) => {
    pool.getConnection((err,connection) => {
        if (err) throw err
        console.log('connected at' + connection.threadId)
        //using the connection
        connection.query('SELECT * FROM user WHERE id = ?',[req.params.id],(err, result) => {
            connection.release()
            if (!err){
                res.render('view-user',{result})
            }else{
                console.log(err)
            }
                console.log('display data in the table\n',result)
        })
    })
}

module.exports = {
    getAllUsers,
    findUser,
    getNewUserForm,
    addUser,
    getEditUser,
    updateUser,
    deleteUser,
    viewAllUser
}