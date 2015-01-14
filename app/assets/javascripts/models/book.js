ShelfLife.Models.Book = Backbone.Model.extend({
  urlRoot: 'api/books',

  parse: function (response) {
    if (response.ratings) {
      this.ratings().set(response.ratings, {parse: true})
      delete response.ratings
    }

    if (response.author) {
      this.author().set(response.author, {parse: true})
			delete response.author
    }

		if (response.shelves) {
			this.shelves().set(response.shelves, {parse: true})
			delete response.shelves
		}

		return response
  },

  author: function () {
    if (!this._author) {
      this._author = new ShelfLife.Models.Author()
    }

    return this._author
  },

	shelves: function () {
		if (!this._shelves) {
			this._shelves = new ShelfLife.Collections.Shelves()
		}
		return this._shelves
	},

  ratings: function () {
    if (!this._ratings) {
      this._ratings = new ShelfLife.Collections.Ratings()
    }

    return this._ratings
  },

	onShelf: function (shelfId) {
		return !!this.shelves().findWhere({id: shelfId});
	}
});
