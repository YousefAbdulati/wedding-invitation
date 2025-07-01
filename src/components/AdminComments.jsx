import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const API_BASE = import.meta.env.VITE_API_BASE;

function AdminComments() {
  const [comments, setComments] = useState([]);
  const [confirmId, setConfirmId] = useState(null); 

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/comments`);
      setComments(res.data.comments);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/api/comment/${confirmId}`);
      setComments((prev) => prev.filter((c) => c.id !== confirmId));
      setConfirmId(null); 
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

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

  return (
    <section id="admin-comments" className="section">
      <div className="container">
        <h2 className="section-title">All Comments</h2>
        <div className="comments-list">
          {comments.map((c, idx) => {
            const initial = c.name.charAt(0).toUpperCase();
            const color = colors[idx % colors.length];

            return (
              <div key={c.id} className="comment-card">
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
                <button
                  onClick={() => setConfirmId(c.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {confirmId && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Are you sure you want to delete this comment?</p>
            <div className="modal-actions">
              <button className="btn cancel" onClick={() => setConfirmId(null)}>
                Cancel
              </button>
              <button className="btn confirm" onClick={handleConfirmDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminComments;
