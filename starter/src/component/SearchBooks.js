import { useState } from "react";
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';

const SearchBooks = ({ BookList, updateShelf, Shelves }) => {

    const [query, setQuery] = useState("");
    const [searchList, setSearchList] = useState([]);



    const searchShelf = async (query) => {
        setQuery(query);

        if (query === "") {
            setSearchList([]);
        }

        else {
            await BooksAPI.search(query).then(res => {

                if (res !== undefined & !res.error)
                    setSearchList(res);

                else setSearchList([]);

            });
        }
    }


    const findShelf = (book) => {
        const b = BookList.find(element => element.id === book.id);

        return b.shelf;
    }

    return (
        <div>
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to="/"
                    >
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title, author, or ISBN"
                            value={query}
                            onChange={(e) => { searchShelf(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchList !== null ?
                            (searchList.map((book, index) => {
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
                                                            book.imageLinks === undefined ? (null) :
                                                                `url("${book.imageLinks.thumbnail}")`,
                                                    }}
                                                ></div>
                                                <div className="book-shelf-changer">
                                                    {
                                                        BookList.find(element => element.id === book.id) ? (
                                                            <select className="book-shelf-changer select" value={findShelf(book)} onChange={(e) => updateShelf(book, e.target.value)}>
                                                                <option value="label" disabled>
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
                                                            <select className="book-shelf-changer select" defaultValue="none" onChange={(e) => updateShelf(book, e.target.value)}>
                                                                <option value="label" disabled>
                                                                    Add to...
                                                                </option>
                                                                <option value="currentlyReading">
                                                                    Currently Reading
                                                                </option>
                                                                <option value="wantToRead">Want to Read</option>
                                                                <option value="read">Read</option>
                                                                <option value="none">None</option>
                                                            </select>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{book.authors}</div>
                                            <div className="book-title">{book.shelf === undefined ? "" : book.shelf === "none" ? ("Book removed") : (`Book added to ${Shelves.find(shelf => shelf.name === book.shelf).displayName} shelf`)}</div>
                                        </div>

                                    </li>)
                            }
                            )) : (<div></div>)}
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default SearchBooks;