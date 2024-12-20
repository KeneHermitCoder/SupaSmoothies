import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }

    const { data, error } = await supabase.from("smoothies").update({ title, method, rating }).eq("id", id).select().single();

    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields correctly.");
      setTimeout(() => {
        setFormError("");
      }, 3000);
      return;
    }

    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/");
    }
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        navigate("/");
        return;
      }

      console.log(data);
      setTitle(data.title);
      setMethod(data.method);
      setRating(data.rating);
    })();
  }, []);

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Smoothie Recipe</button>

        {formError && (
          <p style={{ color: "red" }} className="error">
            {formError}
          </p>
        )}
      </form>
    </div>
  );
};

export default Update;