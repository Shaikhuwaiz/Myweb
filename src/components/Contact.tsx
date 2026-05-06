import { useState } from "react";
import { FaGithub, FaEnvelope } from "react-icons/fa";
import { FaXTwitter, FaArrowRight, FaCheck } from "react-icons/fa6";
import "./Contact.css";

const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY;

const checklist = [
  "Response within 24 hours, guaranteed",
  "Open to freelance & full-time opportunities",
  "Available for remote work worldwide",
  "Happy to jump on a quick call",
];

const socials = [
  { icon: <FaGithub size={16} />, label: "GitHub", href: "https://github.com" },
  { icon: <FaXTwitter size={15} />, label: "X / Twitter", href: "https://twitter.com" },
  { icon: <FaEnvelope size={15} />, label: "Email", href: "mailto:sheikhuwaiz@gmail.com" },
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New message from ${form.name} — Portfolio Contact`,
          from_name: form.name,
          email: form.email,
          message: form.message,
          redirect: false,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setErrorMsg(data.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  return (
    <section className="contact-section">
      <div className="contact-inner">

        {/* ── LEFT ── */}
        <div className="contact-left">
          <h1 className="showcase-title">Contact</h1>

          <h2 className="contact-heading">
            A simpler way to<br />
            <span className="contact-heading-muted">start working together</span>
          </h2>

          <ul className="contact-checklist">
            {checklist.map((item, i) => (
              <li key={i} className="contact-checklist-item">
                <span className="contact-check-icon"><FaCheck size={10} /></span>
                {item}
              </li>
            ))}
          </ul>

          <div className="contact-divider" />

          
       <div className="review">
  <div className="avatars">
    <img src="https://randomuser.me/api/portraits/women/44.jpg" />
    <img src="https://randomuser.me/api/portraits/men/32.jpg" />
    <img src="https://randomuser.me/api/portraits/men/12.jpg" />
  </div>

  <div className="review-text">
    <div className="review-names">
      Ana Mirov, Jules Park & Sam Oduya
    </div>
    <div className="review-sub">
      plus 40+ ops leaders across SMB and mid-market
    </div>
  </div>
</div>

          

          
        </div>

        {/* ── RIGHT — FORM CARD ── */}
        <div className="contact-card">
          <p className="contact-card-title">Send me a message</p>

          {status === "success" ? (
            <div className="contact-success">
              <div className="contact-success-icon"><FaCheck size={24} /></div>
              <h3>Message sent!</h3>
              <p>I'll get back to you within 24 hours.</p>
              <button
                className="contact-send-btn"
                onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-row">
                <div className="contact-field">
                  <label htmlFor="c-name">Full name*</label>
                  <input id="c-name" type="text" placeholder="Owaiz" required value={form.name} onChange={set("name")} />
                </div>
                <div className="contact-field">
                  <label htmlFor="c-email">Email*</label>
                  <input id="c-email" type="email" placeholder="hello@example.com" required value={form.email} onChange={set("email")} />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="c-message">Message*</label>
                <textarea id="c-message" placeholder="Tell me about your project or opportunity..." rows={5} required value={form.message} onChange={set("message")} />
              </div>

              {status === "error" && (
                <p className="contact-error">{errorMsg}</p>
              )}

              <p className="contact-privacy">
                I only use this to reply to you. No spam, ever.
              </p>

              <button type="submit" disabled={status === "loading"} className="contact-send-btn">
                {status === "loading" ? (
                  <><span className="contact-spinner" /> Sending…</>
                ) : (
                  <>Send message <FaArrowRight size={13} /></>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
