const {Book, Author, AuthorBooks} = require('../models');
const genres = ['Fantasy', 'Thriller', 'Action', 'Romance']

module.exports.viewAll = async function (req, res) {
    const books = await Book.findAll();
    res.render('book/view_all',{books});
};
module.exports.viewProfile= async function (req,res){
    const book = await Book.findByPk(req.params.id,{
        include: 'authors'
    });
    const authors = await Author.findAll();
    let availableAuthors = [];
    for(let i=0; i<authors.length; i++){
        if (!bookHasAuthor(book,authors[i])){
            availableAuthors.push(authors[i]);
        }
    }
    res.render('book/profile',{book, availableAuthors});
};
module.exports.renderEditForm = async function(req,res){
    const book = await Book.findByPk(req.params.id);
    res.render('book/edit', {book, genres});
};
module.exports.updateBook = async function (req,res) {
    const book = await Book.update({
        title: req.body.title,
        publisher: req.body.publisher,
        genre: req.body.genre,
        pages: req.body.pages,
        image: req.body.image,
        description: req.body.description
    },{
        where:{
            id:req.params.id
        }
    });
    res.redirect(`/books/profile/${req.params.id}`);
};
module.exports.renderAddForm= function (req, res) {
    const book = {
        title: '',
        publisher:'',
        genre: genres[0],
        pages: '',
        image:'',
        description: ''
    };
    res.render('book/add',{book,genres});
};
module.exports.addBook = async function (req, res) {
    const book = await Book.create({
        title: req.body.title,
        publisher: req.body.publisher,
        genre: req.body.genre,
        pages: req.body.pages,
        image: req.body.image,
        description: req.body.description
    });
    res.redirect(`/books/profile/${book.id}`);
};
module.exports.deleteBook = async function (req, res) {
    await Book.destroy({
        where: {
            id:req.params.id
        }
    });
    res.redirect('/books');
};
module.exports.writeAuthor = async function (req, res) {
    await AuthorBooks.create({
        author_id: req.body.author,
        book_id: req.params.bookId
    });
    res.redirect(`/books/profile/${req.params.bookId}`);

};
module.exports.removeAuthor = async function (req, res) {
    await AuthorBooks.destroy({
        where:{
            book_id: req.params.bookId,
            author_id: req.params.authorId
        }
    });
    res.redirect(`/books/profile/${req.params.bookId}`);
};

function bookHasAuthor(book,author){
    for (let i=0; i<book.authors.length; i++){
        if(author.id === book.authors[i].id){
            return true
        }
    }
    return false
}