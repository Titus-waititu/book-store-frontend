import  { useRef } from "react";
import "../App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Book } from "../alltypes";

const BookForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const [addBook, setAddBook] = useState<Book[]>([]);

  const handleSubmit = async () => {
    const title = titleRef.current!.value;
    const author = authorRef.current!.value;
    const publicationYear = yearRef.current!.value;

    const book = {
      title,
      author,
      publicationYear,
    };

    try {
      const response = await axios.post(
        "https://book-store-api-8rtp.onrender.com/api/book",
        book
      );
      const jsonData = await response.data;
      setAddBook([...addBook, jsonData]);
      if (response.status !== 201) {
        console.log("Error creating book");
      } else {
        console.log("Book created successfully");
      }
    } catch (error) {
      console.log("Error creating book", error);
    }
  };


  useEffect(() => {
    handleSubmit()
  }, [addBook]);

  return (
    <form  className="forminput">
      <input ref={titleRef} type="text" placeholder="Title" required />
      <input ref={authorRef} type="text" placeholder="Author" required />
      <input
        ref={yearRef}
        type="number"
        placeholder="Publication Year"
        required
      />
      <button type="submit" className="addbtn" onClick={handleSubmit}>
        Add Book
      </button>
    </form>
  );
};

export default BookForm;
