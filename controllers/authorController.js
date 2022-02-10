const {Author} = require('../models');

module.exports.viewAll = async function (req, res) {
    const authors = await Author.findAll();
    res.render('author/view_all',{authors});
};
module.exports.viewProfile= async function (req,res){
    const author = await Author.findByPk(req.params.id);
    res.render('author/profile',{author});
};
module.exports.renderEditForm = async function(req,res){
    const author = await Author.findByPk(req.params.id);
    res.render('author/edit', {author});
};