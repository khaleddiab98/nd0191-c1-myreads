import "./App.css";
import { Routes, Route} from 'react-router-dom';
import Book from './component/Book';
import SearchBooks from "./component/SearchBooks";

function App() {
  //const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    <Routes>
      <Route exact path = "/" element = {
        <Book />
      }/>

      <Route path = "/search" element = {
        <SearchBooks />
      }/>
    </Routes>
    );

}

export default App;
