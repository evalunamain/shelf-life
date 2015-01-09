ShelfLife.Routers.Router = Backbone.Router.extend({
  initialize: function (options){
    this.$rootEl = options.$rootEl
  },

  routes: {
    "": "bookIndex",
    "books": "bookIndex",
    "books/new": "bookNew",
    "books/:id": "bookShow",
    "authors/:id": "authorShow",
    "users": "userIndex",
    "users/:id": "userShow"
  },

  index: function (){
    console.log("in index")
  },

  bookIndex: function (){
    ShelfLife.Collections.books.fetch();
    var bookIndexView = new ShelfLife.Views.BooksIndex({
      collection: ShelfLife.Collections.books
    });
    this._swapView(bookIndexView);
  },

  bookNew: function (){
    var newBookView = new ShelfLife.Views.BooksNew({
      model: new ShelfLife.Models.Book
    });

    this._swapView(newBookView);
  },

  bookShow: function (id){
    var book = ShelfLife.Collections.books.getOrFetch(id);
    var bookShow = new ShelfLife.Views.BookShow({
      model: book
    });

    this._swapView(bookShow);
  },

  authorShow: function (id){
    var author = ShelfLife.Collections.authors.getOrFetch(id);
    author.books().fetch();
    var authorShowView = new ShelfLife.Views.AuthorShow({
      model: author, collection: author.books()
    });
    this._swapView(authorShowView);
  },

  userIndex: function (){
    ShelfLife.Collections.users.fetch();

    var userIndexView = new ShelfLife.Views.UsersIndex({
      collection: ShelfLife.Collections.users
    });
    this._swapView(userIndexView);
  },

  userShow: function (id) {
    var user = ShelfLife.Collections.users.getOrFetch(id);
    user.friends().fetch();
    var userShowView = new ShelfLife.Views.UserShow({
      model: user, collection: user.friends()
    });
    this._swapView(userShowView);
  },

  _swapView: function (view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
