import React from "react";
import "../../styles/style.css";
import { useNavigate } from "react-router-dom";

const BookShelf = () => {
  const navigate = useNavigate();
  const myBookshelf = JSON.parse(localStorage.getItem("bookshelf"));

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <>
      <div className="my-bookshelf-btn-div-2">
        <button className="my-bookshelf-btn" onClick={handleNavigate}>
          Books Page
        </button>
      </div>
      {myBookshelf !== null && myBookshelf.length > 0 ? (
        <div className="card-div">
          <div className="card-container">
            {myBookshelf.map((book) => (
              <div className="card" key={book.key}>
                <div className="book-title">
                  <span>Book Title: </span>
                  {book.title}
                </div>
                <div className="edition-count">
                  <span>Edition Count: </span>
                  {book.edition_count || 0}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text">No Book is added to your Bookshelf</div>
      )}
    </>
  );
};

export default BookShelf;
