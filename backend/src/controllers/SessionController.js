const User = require('../models/User')
//index, show, store, update, destroy
//index-listagem
//show-listar uma unica
//store - criar
//Update - alterar
//DESTROY - destruir
module.exports = {
    async store(req,res) {
        const { email } = req.body;
        let user = await User.findOne({ email })
        if (!user){
            user = await User.create({email});
        }

        return res.json(user);
    }
};