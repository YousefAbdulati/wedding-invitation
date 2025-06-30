import React, { useState, useEffect } from "react";
import "../App.css";

export default function CommentSection() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/comments`);
        const data = await res.json();
        if (data.success) {
          setCommentsList(data.comments);
        }
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
  }, [API_BASE]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lines = comment.split("\n");
    const hasEmptyLineBetween = lines
      .slice(1)
      .some((line, i) => line.trim() === "" && lines[i].trim() !== "");

    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (hasEmptyLineBetween) {
      setErrorMsg("Empty lines in the middle of the comment are not allowed.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message: comment }),
      });

      const data = await res.json();

      if (data.success) {
        const newComment = data.received;
        setCommentsList([newComment, ...commentsList]);
        setName("");
        setComment("");
      }
    } catch (error) {
      console.error("Failed to send comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="comments" className="section">
      <div className="container">
        <h2 className="section-title">Send Us Your Wishes</h2>
        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            maxLength={200}
            rows={6}
          />
          {errorMsg && <p className="error-message">{errorMsg}</p>}

          <div className="char-counter">{comment.length} / 200 characters</div>
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>

        <div className="comments-list">
          {commentsList.map((c, idx) => {
            const initial = c.name.charAt(0).toUpperCase();

            const colors = [
              "#f4a261",
              "#2a9d8f",
              "#e76f51",
              "#264653",
              "#e9c46a",
              "#9b5de5",
              "#00bbf9",
              "#ff006e",
              "#3a86ff",
              "#fb5607",
              "#06d6a0",
              "#ef476f",
            ];
            const color = colors[idx % colors.length];

            return (
              <div key={idx} className="comment-card">
                <div className="comment-header">
                  <div className="avatar" style={{ backgroundColor: color }}>
                    {initial}
                  </div>
                  <span className="comment-name">{c.name}</span>
                </div>
                <div className="comment-body">{c.message}</div>
                {c.created_at && (
                  <div className="comment-time">
                    {new Date(c.created_at).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
