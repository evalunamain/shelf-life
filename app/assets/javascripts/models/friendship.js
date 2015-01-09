ShelfLife.Models.Book = Backbone.Model.extend({
  urlRoot: 'api/friendship',

  friend: function(){
    if (!this._friend) {
      this._friend = new ShelfLife.Models.User()
    }

    return this._friend
  },

  parse: function (response) {
    if (response.friend) {
      this.friend().set(response.friend, {parse: true});
      delete response.friend;
    }

    return response;
  }
});
