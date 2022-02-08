const {Book} = require('../models');
const genres = ['Fantasy', 'Thriller', 'Action', 'Romance']

module.exports.viewAll = async function (req, res) {
    const books = await Book.findAll();
    res.render('book/view_all',{books});
};
module.exports.viewProfile= async function (req,res){
    const book = await Book.findByPk(req.params.id);
    res.render('book/profile',{book});
};