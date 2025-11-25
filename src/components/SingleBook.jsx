import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

function SingleBook({ book, selectedBook, changeSelectedBook }) {
  const [selected, setSelected] = useState(false);

  // componentDidMount
  useEffect(() => {
    console.log("SingleBook montato:", book.title);
  }, []);

  // componentDidUpdate (osserva "selected")
  useEffect(() => {
    if (selected) {
      console.log("Libro selezionato:", book.asin);
    }
  }, [selected]);

  // componentWillUnmount
  useEffect(() => {
    return () => {
      console.log("SingleBook smontato:", book.title);
    };
  }, []);

  return (
    <>
      <Card
        onClick={() => {
          setSelected(!selected);
          changeSelectedBook(book.asin);
        }}
        style={{
          border: selectedBook === book.asin ? "3px solid red" : "none",
        }}
      >
        <Card.Img variant="top" src={book.img} />
        <Card.Body>
          <Card.Title style={{ color: "black" }}>
            {book.title}
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}

export default SingleBook;
