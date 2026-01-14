"use client"
import { useState } from "react"
import Link from "next/link"

export default function WebinarSignup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In a real app you'd post to an API or integrate with an email provider (Supabase, Zapier, etc.)
    console.log("Webinar sign up:", { name, email })
    setSubmitted(true)
  }

  return (
    <main className="container section">
      <div className="container">
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p className="eyebrow" style={{ color: "var(--gold)" }}>Live Webinar</p>
          <h1 className="hero__title">How to Raise Your Keep Rate: Live Webinar</h1>
          <p className="subtitle" style={{ marginTop: 12 }}>
            Join our 60-minute webinar where we walk Canadian business owners
            through the exact process we use to stop the drains and keep more of
            what you earn.
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
                  <button className="btn btn--primary" type="submit">Register for webinar</button>
                  <Link href="/" className="btn btn--outline">Back to home</Link>
                </div>
              </div>
            </form>
          ) : (
            <div style={{ marginTop: 24 }}>
              <h3>Thanks — you’re registered</h3>
              <p className="subtitle">We’ve sent a confirmation to {email}. Check your inbox for details.</p>
              <div style={{ marginTop: 16 }}>
                <Link href="/" className="btn btn--outline">Back to home</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
