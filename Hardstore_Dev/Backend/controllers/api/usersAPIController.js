const { User } = require('../../database/models')
const path = require('path')

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
                user.avatar = `http://localhost:3000/api/users/${req.params.id}/img`
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
    },
    userImage: (req, res)=>{
        User.findByPk(req.params.id,{
            raw: true,
        })
        .then(user => {
            var options = {
                root: "C:/VS_code/Digital-House/proyecto/grupo_4_HardStore/Hardstore_Dev/Backend/public/images/users"
            };
            res.sendFile(user.avatar, options)
        })
    }
}


module.exports = controller
