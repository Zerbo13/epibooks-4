import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = ({ asin, fetchComments }) => {
  const [formData, setFormData] = useState({
    comment: "",
    rate: "1",
    elementId: asin,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer <TOKEN>",
          },
        }
      );

      if (response.ok) {
        alert("Commento inserito!");
        setFormData({ comment: "", rate: "1", elementId: asin });
        fetchComments();
      } else {
        alert("Errore nell’invio del commento");
      }
    } catch (error) {
      console.error(error);
      alert("Errore di rete");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group>
        <Form.Label>Commento</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formData.comment}
          onChange={(e) => handleChange("comment", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Voto</Form.Label>
        <Form.Select
          value={formData.rate}
          onChange={(e) => handleChange("rate", e.target.value)}
        >
          <option value="1">1 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="5">5 ⭐</option>
        </Form.Select>
      </Form.Group>

      <Button type="submit" className="mt-3">
        Aggiungi Commento
      </Button>
    </Form>
  );
};

export default AddComment;
