"use client"
import { useState } from "react"
import Link from "next/link"

export default function CourseSignup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log("Course signup:", { name, email })
    setSubmitted(true)
  }

  return (
    <main className="container section section--cream">
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <p className="eyebrow" style={{ color: "var(--gold)" }}>Free 5-Day Course</p>
        <h1 className="hero__title">Keep More of What You Earn — 5 short lessons, one per day</h1>
        <p className="subtitle" style={{ marginTop: 12 }}>
          Join our free course: five actionable emails that walk you through the
          steps to increase your Keep Rate. Practical, non-technical lessons you
          can use immediately.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
            <div style={{ display: "grid", gap: 12 }}>
              <label>
                <div style={{ fontSize: 14, marginBottom: 6 }}>Full name</div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Jane Doe"
                  className="input"
                  style={{ padding: "12px 14px", width: "100%" }}
                />
              </label>

              <label>
                <div style={{ fontSize: 14, marginBottom: 6 }}>Email</div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  placeholder="you@company.com"
                  className="input"
                  style={{ padding: "12px 14px", width: "100%" }}
                />
              </label>

              <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
                <button className="btn btn--primary">Start the free course</button>
                <Link href="/" className="btn btn--outline">Back to home</Link>
              </div>

              <p className="subtitle" style={{ marginTop: 12, fontSize: 13 }}>
                By signing up you agree to receive emails from WealthBridge. You
                can unsubscribe anytime.
              </p>
            </div>
          </form>
        ) : (
          <div style={{ marginTop: 24 }}>
            <h3>You're in — check your inbox</h3>
            <p className="subtitle">We sent the first lesson to {email}. Expect one short email per day for 5 days.</p>
            <div style={{ marginTop: 16 }}>
              <Link href="/" className="btn btn--outline">Back to home</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
