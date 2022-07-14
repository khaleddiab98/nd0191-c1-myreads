import { useState, useEffect, Children } from "react";
import * as BooksAPI from '../BooksAPI';
import {Link} from 'react-router-dom';

const Book = (props) => {

    const [bookList, setBookList] = useState([]);
    const [showSearchPage, setShowSearchpage] = useState(false);

    useEffect(() =>{
        const loadBooks = async ()  =>{
            const res = await BooksAPI.getAll();
     
             setBookList(res);
         };

         loadBooks(); 
    }, []);
        
    
   
    const changeShelf = async (book, shelf) =>{

        const res = await BooksAPI.update(book, shelf);

        const res2 = await BooksAPI.getAll();
            
        setBookList(res2);
    }
   
    

    return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              className="close-search"
              to = "/"
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
            <div className="list-books-content">
                <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {bookList.map((book, index) => { if(book.shelf === "currentlyReading"){
                        return( <li key = {index} className = "books-grid li">
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
                                <select className = "book-shelf-changer select" value = {book.shelf} onChange = {(e) => changeShelf(book, e.target.value)}>
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
                </div>
            </div>
            <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want To Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    
                    {bookList.map((book, index) => { if(book.shelf === "wantToRead"){
                       return( <li key = {index} className = "books-grid li">
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
                              <select className = "book-shelf-changer select" defaultValue = {book.shelf} onChange = {(e) => changeShelf(book, e.target.value)}>
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
            </div>
        </div>
        <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    
                    {bookList.map((book, index) => { if(book.shelf === "read"){
                       return( <li key = {index} className = "books-grid li">
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
                              <select className = "book-shelf-changer select" defaultValue = {book.shelf} onChange = {(e) => changeShelf(book, e.target.value)}>
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
            </div>
        </div>
        </div>
        <div className="open-search">
        <Link to = "/search">Add a book</Link>
      </div>
      </div>
  )}
</div>
);
    
}

export default Book;