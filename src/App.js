import './App.css';
import {  Routes, Route } from 'react-router-dom';
import BookCard from './pages/bookcard/BookCard';
import BookShelf from './pages/bookshelf/BookShelf';

function App() {
  return (
    <Routes>
      <Route path='/' element={<BookCard />} />
      <Route path='/bookshelf' element={<BookShelf />} />
    </Routes>
  );
}

export default App;
