import { useState, useEffect, Children } from "react";
import * as BooksAPI from '../BooksAPI';
import {Link} from 'react-router-dom';

const SearchBooks = () => {

    const [query, setQuery] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [bookList, setBookList] = useState([]);

    let b;

    useEffect(() =>{
        const loadBooks = async ()  =>{
            const res = await BooksAPI.getAll();
     
             setBookList(res);
         };

         loadBooks(); 
    }, []);

    const searchShelf = async (query) =>{
        setQuery(query);

       

        if(query != null){
            const res = await BooksAPI.search(query.trim());
            setSearchList(res);
            
        }
        
        else
            setSearchList();

        console.log(searchList);
        
    }

    const changeShelf = async (book, shelf) =>{

        const res = await BooksAPI.update(book, shelf);
    }

    const findShelf = (book) => {
        const b = bookList.find(element => element.id === book.id);
        
        return b.shelf;
    } 

    return (
        <div>
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
                value = {query}
                onChange = {(e) => searchShelf(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {searchList != undefined ? 
                (searchList.map((book, index) => {
                        return (
                            <li key = {index} className = "books-grid li">
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
                                {
                                    bookList.find(element => element.id === book.id) ? (
                                        <select className = "book-shelf-changer select" value = {findShelf(book)} onChange = {(e) => changeShelf(book, e.target.value)}>
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
                                    ) : (
                                        <select className = "book-shelf-changer select"  defaultValue = "none" onChange = {(e) => changeShelf(book, e.target.value)}>
                                            <option value="none" disabled>
                                            Add to...
                                            </option>
                                            <option value="currentlyReading">
                                            Currently Reading
                                            </option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                        </select>
                                    )
                                }
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-title">{book.shelf}</div>
                            <div className="book-authors">{book.authors}</div>
                            </div>
                        
                        </li>)}
                )) : (<div></div>)}
   
            </ol>
          </div>
        </div>
        </div>
    );
}

export default SearchBooks;