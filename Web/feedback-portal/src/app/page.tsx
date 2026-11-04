"use client";

import { useEffect, useState } from "react";

type Feedback = {
  id: string;
  name: string;
  message: string;
  rating: number;
  createdAt: string;
};

export default function Home() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState("5");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadFeedback() {
    const response = await fetch("/api/feedback");
    const data = await response.json();
    setFeedback(data);
  }

  useEffect(() => {
    loadFeedback();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const payload = { name, message, rating: Number(rating), id: editingId };
    const response = await fetch("/api/feedback", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Something went wrong.");
    } else {
      setName("");
      setMessage("");
      setRating("5");
      setEditingId(null);
      await loadFeedback();
    }

    setLoading(false);
  }

  function editFeedback(item: Feedback) {
    setEditingId(item.id);
    setName(item.name);
    setMessage(item.message);
    setRating(String(item.rating));
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteFeedback(id: string) {
    if (!window.confirm("Delete this feedback?")) return;

    const response = await fetch(`/api/feedback?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await loadFeedback();
    } else {
      setError("Could not delete feedback.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-slate-100">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">
            Learning Fest · Web Dev 12
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Feedback Portal
          </h1>
          <p className="mt-4 text-slate-400">
            Share your thoughts. Help us improve.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mb-10 space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6"
        >
          <h2 className="text-xl font-semibold">
            {editingId ? "Edit feedback" : "Leave feedback"}
          </h2>

          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-slate-300">
              Your name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              required
              placeholder="Enter your name"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-teal-400"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm text-slate-300">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              required
              rows={4}
              placeholder="Write your feedback..."
              className="w-full resize-y rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-teal-400"
            />
            <p className="mt-1 text-right text-xs text-slate-500">
              {message.length}/500
            </p>
          </div>

          <div>
            <label htmlFor="rating" className="mb-2 block text-sm text-slate-300">
              Rating
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-teal-400"
            >
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value} / 5
                </option>
              ))}
            </select>
          </div>

          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

          <div className="flex flex-wrap gap-3">
            <button
              disabled={loading}
              className="rounded-lg bg-teal-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-teal-300 disabled:opacity-50"
            >
              {loading ? "Saving..." : editingId ? "Update feedback" : "Submit feedback"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setName("");
                  setMessage("");
                  setRating("5");
                  setError("");
                }}
                className="rounded-lg border border-slate-700 px-5 py-3 text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Community feedback</h2>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
              {feedback.length} entries
            </span>
          </div>

          <div className="space-y-4">
            {feedback.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="mt-1 text-sm text-amber-400">
                      {"★".repeat(item.rating)}{" "}
                      <span className="text-slate-500">{item.rating}/5</span>
                    </p>
                  </div>
                  <time className="text-xs text-slate-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </time>
                </div>

                <p className="mt-4 whitespace-pre-wrap leading-relaxed text-slate-300">
                  {item.message}
                </p>

                <div className="mt-5 flex gap-4 border-t border-slate-800 pt-4 text-sm">
                  <button
                    onClick={() => editFeedback(item)}
                    className="text-teal-400 hover:text-teal-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteFeedback(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}

            {feedback.length === 0 && (
              <p className="rounded-xl border border-slate-800 p-8 text-center text-slate-400">
                No feedback yet. Be the first to share your thoughts!
              </p>
            )}
          </div>
        </section>

        <footer className="mt-12 text-center text-xs text-slate-500">
          Built for μLearn Learning Fest · #evn-lf26-web-dev12
        </footer>
      </div>
    </main>
  );
}
