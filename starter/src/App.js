import "./App.css";
import { Routes, Route, Link } from 'react-router-dom';
import Shelf from './component/Shelf';
import SearchBooks from "./component/SearchBooks";
import { useState, useEffect } from "react";
import * as BooksAPI from './BooksAPI';

const App = () => {

  const [bookList, setBookList] = useState([]);

  const shelves = [{ id: 0, name: "currentlyReading", displayName: "Currently Reading" }, { id: 1, name: "wantToRead", displayName: "Want To Read" }, { id: 2, name: "read", displayName: "Read" }];

  useEffect(() => {


    const loadBooks = async () => {
      const res = await BooksAPI.getAll();

      setBookList(res);


    };

    loadBooks();
  }, []);

  const changeShelf = async (book, shelf) => {

    book.shelf = shelf;

    await BooksAPI.update(book, shelf).then(() => {
      let newBookList = bookList.filter(b => b.id !== book.id);

      newBookList = [...newBookList, book];

      setBookList(newBookList);
    });


  }

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="open-search">
          <Link className="open-seach a" to="/search">Add a book</Link>
        </div>
        <Routes>
          <Route exact path="/" element={
            <Shelf BookList={bookList} updateBookList={setBookList} updateShelf={changeShelf} Shelves={shelves}/>
          } />

          <Route path="/search" element={
            <SearchBooks BookList={bookList} updateBookList={setBookList} updateShelf={changeShelf} Shelves={shelves}/>
          } />
        </Routes>
      </div>

    </div>
  );

}

export default App;
