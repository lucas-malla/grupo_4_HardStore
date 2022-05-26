const { User } = require('../../database/models')

const controller ={
    list: (req,res) =>{
        User.findAll({
            raw: true,
        })
        .then(users => {
            users.forEach((user)=>{
                delete user.password,
                delete user.cellphone,
                delete user.street,
                delete user.street_number,
                delete user.avatar,
                delete user.created_at,
                delete user.updated_at
                user["detail"] = `/api/users/${user.id}`
            })
            let response = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: 'api/users'
                },
                data: users
            }
            res.json(response);
            })
    },
    detail: (req,res) =>{
        User.findByPk(req.params.id,{
            raw: true,
        })
        .then(user => {
            try{
                delete user.password,
                user.avatar = `/images/products/${user.avatar}`
                let response = {
                    meta: {
                        status : 200,
                        url: `api/user/${req.params.id}`
                    },
                    data: user
                }
                res.json(response);
            } catch {
                let response = {
                    meta: {
                        status : 400,
                        msj: "bad id request",
                        url: `api/user/${req.params.id}`
                        
                    }
                }
                res.status(400).json(response)
            }
        })
    }
}


module.exports = controller
