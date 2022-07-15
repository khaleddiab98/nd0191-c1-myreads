const Shelf = ({ BookList, updateShelf, Shelves }) => {

  return (
    <div className="list-books-content">
      <div>
        {
          Shelves.map(((shelf, index) => {
            return (
              <div className="bookshelf" key={index}>
                <h2 className="bookshelf-title">{shelf.displayName}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {BookList.map((book, index) => {
                      if (book.shelf === shelf.name) {
                        return (
                          <li key={index} className="books-grid li">
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage:
                                      `url("${book.imageLinks.thumbnail}")`,
                                  }}
                                ></div>
                                <div className="book-shelf-changer">
                                  <select className="book-shelf-changer select" value={book.shelf} onChange={(e) => { updateShelf(book, e.target.value) }}>
                                    <option value="none" disabled>
                                      Move to...
                                    </option>
                                    <option value="currentlyReading">
                                      Currently Reading
                                    </option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors}</div>
                            </div>
                          </li>
                        )
                      }
                    })}
                  </ol>
                </div>
              </div>
            )
          }))
        }
      </div>
    </div>

  );

}

export default Shelf;