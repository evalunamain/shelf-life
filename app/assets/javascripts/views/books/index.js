ShelveMe.Views.BooksIndex = Backbone.CompositeView.extend({

  template: JST["books/index"],

  className: "index",

  initialize: function () {
    this.listenToOnce(this.collection, "sync", this.render);
  },

  addBookView: function (book) {
    var bookView = new ShelveMe.Views.indexBookItem({
      model: book
    });
    this.addSubview("ul.index", bookView);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
		this.collection.each(this.addBookView.bind(this));
    return this;
  },

});
