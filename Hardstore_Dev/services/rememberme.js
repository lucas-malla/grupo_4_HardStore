

const remember = function(){
    if(req.cookies){
        req.session.user = req.cookies.userName
    }
}


module.exports = remember