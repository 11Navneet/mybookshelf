import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/style.css";

const BookCard = () => {
  const storedInput = localStorage.getItem("searchInput");
  const [input, setInput] = useState(storedInput || "");
  const [result, setResult] = useState([]);
  const [bookshelf, setBookshelf] = useState([]);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInput(event.target.value);
    localStorage.setItem("searchInput", event.target.value);
  };

  useEffect(() => {
    async function fetchBooks() {
      if (input) {
        try {
          let resp = await fetch(
            `https://openlibrary.org/search.json?q=${input}&limit=10&page=1`
          );
          if (!resp.ok) {
            throw new Error(`API error: ${resp.status}`);
          }
          let data = await resp.json();
          setResult(data.docs);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      } else {
        setResult([]);
      }
    }
    fetchBooks();
  }, [input]);

  const handleNavigate = () => {
    navigate("/bookshelf");
  };

  const handleAdd = (book) => {
    const existingBookshelf =
      JSON.parse(localStorage.getItem("bookshelf")) || [];
    const duplicateBook = existingBookshelf.some(
      (existingBook) => existingBook.key === book.key
    );
    if (!duplicateBook) {
      const updatedBookshelf = [...existingBookshelf, book];
      localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
      setBookshelf(updatedBookshelf);
    } else {
      alert(`Book '${book.title}' already exists in your bookshelf.`);
    }
  };

  return (
    <>
      <div className="search-container">
        <div className="search-div">
          <div className="search-bar">
            <label className="search-label">Search by book name:</label>
            <input
              type="text"
              className="search-input"
              value={input}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-bookshelf-btn-div">
            <button className="my-bookshelf-btn" onClick={handleNavigate}>
              My BookShelf
            </button>
          </div>
        </div>
      </div>
      <div className="card-div">
        <div className="card-container">
          {result.length > 0 && (
            <>
              {result.map((book) => (
                <div className="card" key={book.key}>
                  <div className="book-title">
                    <span>Book Title: </span>
                    {book.title}
                  </div>
                  <div className="edition-count">
                    <span>Edition Count: </span>
                    {book.edition_count || 0}
                  </div>
                  <button className="add-btn" onClick={() => handleAdd(book)}>
                    Add to Bookshelf
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BookCard;
