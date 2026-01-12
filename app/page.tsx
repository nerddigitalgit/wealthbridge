'use client'

import { useEffect } from 'react'
import Image from 'next/image'

export default function Home() {
  useEffect(() => {
    // Navbar scroll effect
    const nav = document.getElementById('nav')
    const handleScroll = () => {
      if (window.scrollY > 50) {
        nav?.classList.add('scrolled')
      } else {
        nav?.classList.remove('scrolled')
      }
    }
    window.addEventListener('scroll', handleScroll)

    // FAQ accordion
    document.querySelectorAll('.faq-item__question').forEach(button => {
      button.addEventListener('click', () => {
        const item = button.parentElement
        const isActive = item?.classList.contains('active')

        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'))

        // Open clicked if it wasn't active
        if (!isActive) {
          item?.classList.add('active')
        }
      })
    })

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))

    // Carousel smooth drag scroll with momentum
    const carouselRows = document.querySelectorAll('.results-carousel__row')

    carouselRows.forEach(row => {
      let isDown = false
      let startX: number
      let scrollLeft: number
      let velX = 0
      let momentumID: number
      let lastX: number
      let lastTime: number

      // Prevent text selection during drag
      row.addEventListener('selectstart', (e) => {
        e.preventDefault()
      })

      // Clone cards for infinite loop
      const cards = row.querySelectorAll('.results-card')
      cards.forEach(card => {
        const clone = card.cloneNode(true)
        row.appendChild(clone)
      })

      // Momentum animation function
      function applyMomentum() {
        if (Math.abs(velX) > 0.5) {
          (row as HTMLElement).scrollLeft += velX
          velX *= 0.92 // Friction - lower = more slide

          // Check for infinite loop boundaries
          checkBoundaries()

          momentumID = requestAnimationFrame(applyMomentum)
        }
      }

      // Check boundaries for infinite scroll
      function checkBoundaries() {
        const scrollWidth = (row as HTMLElement).scrollWidth
        const halfScroll = scrollWidth / 2

        if ((row as HTMLElement).scrollLeft <= 10) {
          (row as HTMLElement).scrollLeft = halfScroll - 10
        } else if ((row as HTMLElement).scrollLeft >= halfScroll - 10) {
          (row as HTMLElement).scrollLeft = 10
        }
      }

      // Mouse events
      row.addEventListener('mousedown', (e) => {
        const event = e as MouseEvent
        isDown = true
        cancelAnimationFrame(momentumID)
        ;(row as HTMLElement).style.cursor = 'grabbing'
        startX = event.pageX
        scrollLeft = (row as HTMLElement).scrollLeft
        lastX = event.pageX
        lastTime = Date.now()
        velX = 0
        event.preventDefault()
      })

      row.addEventListener('mouseleave', () => {
        if (isDown) {
          isDown = false
          ;(row as HTMLElement).style.cursor = 'grab'
          momentumID = requestAnimationFrame(applyMomentum)
        }
      })

      row.addEventListener('mouseup', () => {
        if (isDown) {
          isDown = false
          ;(row as HTMLElement).style.cursor = 'grab'
          momentumID = requestAnimationFrame(applyMomentum)
        }
      })

      row.addEventListener('mousemove', (e) => {
        const event = e as MouseEvent
        if (!isDown) return
        event.preventDefault()

        const x = event.pageX
        const now = Date.now()
        const dt = now - lastTime

        // Calculate velocity based on movement
        if (dt > 0) {
          velX = (lastX - x) * 0.3
        }

        const walk = x - startX
        ;(row as HTMLElement).scrollLeft = scrollLeft - walk

        // Check boundaries during drag
        checkBoundaries()

        lastX = x
        lastTime = now
      })

      // Touch events for mobile
      let touchStartX: number
      let touchScrollLeft: number
      let touchLastX: number
      let touchLastTime: number

      row.addEventListener('touchstart', (e) => {
        const event = e as TouchEvent
        cancelAnimationFrame(momentumID)
        touchStartX = event.touches[0].pageX
        touchScrollLeft = (row as HTMLElement).scrollLeft
        touchLastX = touchStartX
        touchLastTime = Date.now()
        velX = 0
      }, { passive: true })

      row.addEventListener('touchmove', (e) => {
        const event = e as TouchEvent
        const x = event.touches[0].pageX
        const now = Date.now()
        const dt = now - touchLastTime

        // Calculate velocity
        if (dt > 0) {
          velX = (touchLastX - x) * 0.3
        }

        const walk = x - touchStartX
        ;(row as HTMLElement).scrollLeft = touchScrollLeft - walk

        // Check boundaries during drag
        checkBoundaries()

        touchLastX = x
        touchLastTime = now
      }, { passive: true })

      row.addEventListener('touchend', () => {
        momentumID = requestAnimationFrame(applyMomentum)
      })
    })

    // Set initial scroll positions
    function initCarousel() {
      const row1 = document.getElementById('carousel-row-1') as HTMLElement
      const row2 = document.getElementById('carousel-row-2') as HTMLElement
      const isMobile = window.innerWidth <= 768

      // On mobile, start at 0 (padding handles centering)
      // On desktop, offset for visual interest
      if (row1) {
        row1.scrollLeft = isMobile ? 0 : 80
      }

      if (row2) {
        row2.scrollLeft = isMobile ? 0 : 300
      }
    }

    // Small delay to ensure DOM is ready
    setTimeout(initCarousel, 100)

    // Re-center on resize
    window.addEventListener('resize', initCarousel)

    // Modal functionality
    const modalOverlay = document.getElementById('course-modal')
    const modalForm = document.getElementById('course-form') as HTMLFormElement
    const modalFormContainer = document.getElementById('course-form-container')
    const modalSuccess = document.getElementById('course-success')
    const modalClose = document.querySelector('.modal__close')

    // Open modal
    document.querySelectorAll('[data-open-modal="course-modal"]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault()
        modalOverlay?.classList.add('active')
        document.body.style.overflow = 'hidden'
      })
    })

    // Close modal
    function closeModal() {
      modalOverlay?.classList.remove('active')
      document.body.style.overflow = ''
      // Reset form after animation
      setTimeout(() => {
        modalFormContainer?.classList.remove('hidden')
        modalSuccess?.classList.remove('active')
        modalForm?.reset()
      }, 300)
    }

    modalClose?.addEventListener('click', closeModal)
    modalOverlay?.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal()
    })
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) closeModal()
    })

    // Form submission
    modalForm?.addEventListener('submit', async (e) => {
      e.preventDefault()
      const email = modalForm.querySelector('input[name="email"]') as HTMLInputElement
      const emailValue = email?.value

      // TODO: Replace with actual webhook URL
      const webhookUrl = 'YOUR_WEBHOOK_URL_HERE'

      try {
        // Uncomment when you have the webhook URL
        // await fetch(webhookUrl, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email: emailValue })
        // })

        // Show success message
        modalFormContainer?.classList.add('hidden')
        modalSuccess?.classList.add('active')
      } catch (error) {
        console.error('Form submission error:', error)
        alert('Something went wrong. Please try again.')
      }
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', initCarousel)
    }
  }, [])

  return (
    <>
      {/* NAVIGATION */}
      <nav className="nav" id="nav">
        <div className="container">
          <div className="nav__inner">
            <a href="#" className="nav__logo">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F44e3e188e75945c7957b904ccda3f1ae%2Ff7b2d5722c154463a1030bb8f85b5372" alt="WealthBridge" className="nav__logo-img" />
            </a>
            <ul className="nav__links">
              <li><a href="#solution" className="nav__link">Our Approach</a></li>
              <li><a href="#results" className="nav__link">Results</a></li>
              <li><a href="#process" className="nav__link">How It Works</a></li>
              <li><a href="#faq" className="nav__link">FAQ</a></li>
            </ul>
            <div className="nav__actions">
              <a href="https://calendly.com/wealthbridgeto/30min?month=2026-01" className="btn btn--outline nav__cta">Keep More Wealth</a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero__content">
            <p className="hero__eyebrow animate">For Canadian Business Owners</p>
            <h1 className="hero__title animate animate-delay-1">The wealthy don&apos;t just earn more. They <span>keep</span> more.</h1>
            <p className="hero__subtitle animate animate-delay-2">Your Keep Rate is the share of every dollar you actually keep after tax, fees, and leakage. Most Canadian owners overwork with a low Keep Rate and wonder why freedom never arrives. We raise your Keep Rate by restructuring tax, reallocating retained earnings, cutting cost drag, and fixing withdrawal policy.</p>
            <div className="hero__cta animate animate-delay-3">
              <a href="https://calendly.com/wealthbridgeto/30min?month=2026-01" className="btn btn--primary btn--large">Get Your Free Keep Rate Audit</a>
              <a href="#" className="btn btn--outline btn--large" data-open-modal="course-modal">Learn How to Keep More Wealth</a>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK PROOF / CLIENT RESULTS (Before Problem) */}
      <section className="quickproof section">
        <div className="container">
          <div className="quickproof__header">
            <p className="eyebrow">Client Results</p>
            <h2>Real outcomes. Real business owners.</h2>
          </div>
          <div className="quickproof__grid">
            <div className="quickproof__card fade-in">
              <div className="quickproof__avatar">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" alt="Lawyer portrait" />
              </div>
              <div className="quickproof__content">
                <h3 className="quickproof__headline">$3.2M saved in taxes over 15 yrs</h3>
                <p className="quickproof__meta">12 YEARS IN PRACTICE • $600K INCOME<br /><br /></p>
                <p className="quickproof__text">Nobody asked: &quot;Why aren&apos;t you incorporated?&quot; We did.</p>
              </div>
            </div>
            <div className="quickproof__card fade-in">
              <div className="quickproof__avatar">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face" alt="Business owner portrait" />
              </div>
              <div className="quickproof__content">
                <h3 className="quickproof__headline">$0 in taxes to <br />build wealth </h3>
                <p className="quickproof__meta">BUSINESS OWNER • <br />$500K REVENUE<br /><br /></p>
                <p className="quickproof__text">Using tax efficient vehicles, she now pays $0 in taxes.</p>
              </div>
            </div>
            <div className="quickproof__card fade-in">
              <div className="quickproof__avatar">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Executive portrait" />
              </div>
              <div className="quickproof__content">
                <h3 className="quickproof__headline">$44M projected net worth</h3>
                <p className="quickproof__meta">Executive • <br />$1M+ Income<br /><br /></p>
                <p className="quickproof__text">Pension wasn&apos;t invested. We fixed that.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section className="problem section" id="problem">
        <div className="container">
          <div className="problem__header">
            <p className="eyebrow">The Problem</p>
            <h2>You have a low Keep Rate.</h2>
          </div>

          <div className="problem__definition fade-in">
            <p className="problem__definition-text"><strong className="problem__definition-term">Keep Rate:</strong> The percentage of your income you actually keep after taxes, interest, and wealth drains. It&apos;s the single number that determines whether you build generational wealth — or work your whole life with little to show for it.</p>
          </div>

          {/* Comparison Grid */}
          <div className="problem__comparison fade-in">
            <div className="problem__comparison-grid">
              <div className="problem__column problem__column--left">
                <h3 className="problem__column-title">Everyone Else</h3>
                <span className="problem__column-badge">~50% Keep Rate</span>
                <ul className="problem__list">
                  <li className="problem__item">
                    <span className="problem__item-icon">✗</span>
                    <span className="problem__item-text">Pay <strong>36-53% personal tax</strong> before you can invest</span>
                  </li>
                  <li className="problem__item">
                    <span className="problem__item-icon">✗</span>
                    <div style={{ display: "block", color: "rgb(61, 61, 61)", fontWeight: "400", marginLeft: "1px" }}>Wrong legal structure, taxed at personal rates</div>
                  </li>
                  <li className="problem__item">
                    <span className="problem__item-icon">✗</span>
                    <span className="problem__item-text">Corporate cash sits idle, taxed as passive income</span>
                  </li>
                  <li className="problem__item">
                    <span className="problem__item-icon">✗</span>
                    <span className="problem__item-text">Withdraw dividends, trigger <strong>tax events</strong></span>
                  </li>
                  <li className="problem__item">
                    <span className="problem__item-icon">✗</span>
                    <span className="problem__item-text">RRSP withdrawals taxed at <strong>36-53%</strong> in retirement</span>
                  </li>
                </ul>
              </div>
              <div className="problem__column problem__column--right">
                <h3 className="problem__column-title">The Ultra-Wealthy</h3>
                <span className="problem__column-badge">85%+ Keep Rate</span>
                <ul className="problem__list">
                  <li className="problem__item">
                    <span className="problem__item-icon">✓</span>
                    <span className="problem__item-text">Pay <strong>0-12% taxes</strong></span>
                  </li>
                  <li className="problem__item">
                    <span className="problem__item-icon">✓</span>
                    <span className="problem__item-text">Structured for <strong>wealth building</strong>, not just operations</span>
                  </li>
                  <li className="problem__item">
                    <span className="problem__item-icon">✓</span>
                    <span className="problem__item-text">Retained earnings grow <strong>tax-free</strong> in tax-efficient vehicles</span>
                  </li>
                  <li className="problem__item">
                    <span className="problem__item-icon">✓</span>
                    <span className="problem__item-text"><strong>Tax-Efficient</strong> retirement income streams</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="problem__cta">
            <a href="#" className="btn btn--dark btn--large" data-open-modal="course-modal">Learn How to Keep More Wealth</a>
          </div>
        </div>
      </section>

      {/* DOTTED CONNECTOR */}
      <div className="dotted-connector"></div>

      {/* SOLUTION (The First Step) */}
      <section className="solution section" id="solution">
        <div className="container">
          <div className="solution__header">
            <p className="eyebrow">The First Step to More Wealth</p>
            <h2>Stop losing 50 cents on every dollar.</h2>
            <p className="solution__lead">The ultra-wealthy don&apos;t start by earning more. They start by keeping more. Before you can grow wealth, you have to stop the drains that are bleeding it away.</p>
          </div>
          <div className="solution__grid">
            <div className="solution-card fade-in">
              <div className="solution-card__step">1</div>
              <h3 className="solution-card__title">Find the Drains</h3>
              <p className="solution-card__text">Audit where your money is actually going. Taxes, structure, cash flow, interest — identify every dollar leaving that doesn&apos;t have to.</p>
            </div>
            <div className="solution-card fade-in">
              <div className="solution-card__step">2</div>
              <h3 className="solution-card__title">Fix Your Structure</h3>
              <p className="solution-card__text">Incorporation is layer one. There are many layers after. Are you structured for wealth building or just day-to-day operations? Set up the right entities for where you&apos;re going.</p>
            </div>
            <div className="solution-card fade-in">
              <div className="solution-card__step">3</div>
              <h3 className="solution-card__title">Eliminate Unnecessary Tax</h3>
              <p className="solution-card__text">Your biggest expense isn&apos;t your mortgage, it&apos;s your taxes. Create tax-efficient vehicle to grow your wealth and reduce your marginal tax rate. </p>
            </div>
            <div className="solution-card fade-in">
              <div className="solution-card__step">4</div>
              <h3 className="solution-card__title">Activate Retained Earnings</h3>
              <p className="solution-card__text">Money sitting in your corporation should be working. Position it in tax-exempt vehicles that grow annually — accessible without triggering taxes.</p>
            </div>
            <div className="solution-card fade-in">
              <div className="solution-card__step">5</div>
              <h3 className="solution-card__title">Create Liquidity</h3>
              <p className="solution-card__text"><div>The real cost of accessing corporate wealth isn&apos;t the 12-27% corporate tax you&apos;ve already paid. It&apos;s the additional 36-53% personal tax on withdrawal. That&apos;s the problem we&apos;re solving.<br /></div></p>
            </div>
            <div className="solution-card fade-in">
              <div className="solution-card__step">6</div>
              <h3 className="solution-card__title">Design Tax-Free Retirement</h3>
              <p className="solution-card__text">The goal: multiple streams of tax-efficient income in retirement. Design your exit strategy now so you keep what you earned, not only half of it.</p>
            </div>
          </div>
          <div className="solution__cta">
            <a href="https://calendly.com/wealthbridgeto/30min?month=2026-01" className="btn btn--primary btn--large">Get Your Free Keep Rate Audit</a>
            <a href="#" className="btn btn--outline btn--large" data-open-modal="course-modal">Take the Free Course</a>
          </div>
        </div>
      </section>

      {/* DOTTED CONNECTOR */}
      <div className="dotted-connector"></div>

      {/* CAROUSEL RESULTS */}
      <section className="results-carousel section" id="results">
        <div className="container">
          <div className="results-carousel__header">
            <p className="eyebrow">Client Results</p>
            <h2>What a higher Keep Rate looks like</h2>
            <p className="subtitle" style={{ margin: '20px auto 0', textAlign: 'center' }}>Real results from Canadian business owners. Swipe to see more.</p>
          </div>
        </div>

        <div className="results-carousel__wrapper">
          {/* Row 1 */}
          <div className="results-carousel__row" id="carousel-row-1">
            <div className="results-card">
              <div className="results-card__avatar">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" alt="Lawyer portrait" />
              </div>
              <div className="results-card__content">
                <span className="results-card__type">Lawyer • 12 Years</span>
                <h3 className="results-card__headline">$3.2M saved over career</h3>
                <p className="results-card__text">Partner at a major firm. RBC wealth client. Nobody asked: &quot;Why aren&apos;t you incorporated?&quot;</p>
                <div className="results-card__metrics">
                  <div className="results-card__metric results-card__metric--before">
                    <p className="results-card__metric-label">Before</p>
                    <p className="results-card__metric-value">50% taxes</p>
                  </div>
                  <div className="results-card__metric results-card__metric--after">
                    <p className="results-card__metric-label">After</p>
                    <p className="results-card__metric-value">12% taxes</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="results-card">
              <div className="results-card__avatar">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face" alt="Solopreneur portrait" />
              </div>
              <div className="results-card__content">
                <span className="results-card__type">Solopreneur • $150K</span>
                <h3 className="results-card__headline">$40K saved year one</h3>
                <p className="results-card__text">Making $150K but only needed $30K to live. Was paying 50% tax on the full amount.</p>
                <div className="results-card__metrics">
                  <div className="results-card__metric results-card__metric--before">
                    <p className="results-card__metric-label">Before</p>
                    <p className="results-card__metric-value">Sole Prop</p>
                  </div>
                  <div className="results-card__metric results-card__metric--after">
                    <p className="results-card__metric-label">After</p>
                    <p className="results-card__metric-value">Inc&apos;d</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="results-card">
              <div className="results-card__avatar">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" alt="Dentist portrait" />
              </div>
              <div className="results-card__content">
                <span className="results-card__type">Dentist • Practice Owner</span>
                <h3 className="results-card__headline">$1.8M additional retirement</h3>
                <p className="results-card__text">Thought his accountant had everything covered. We found $180K/yr in missed savings.</p>
                <div className="results-card__metrics">
                  <div className="results-card__metric results-card__metric--before">
                    <p className="results-card__metric-label">Before</p>
                    <p className="results-card__metric-value">$4.2M</p>
                  </div>
                  <div className="results-card__metric results-card__metric--after">
                    <p className="results-card__metric-label">After</p>
                    <p className="results-card__metric-value">$6M</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="results-card">
              <div className="results-card__avatar">
                <img src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face" alt="Consultant portrait" />
              </div>
              <div className="results-card__content">
                <span className="results-card__type">Consultant • $250K</span>
                <h3 className="results-card__headline">$55K saved annually</h3>
                <p className="results-card__text">High income, no structure. Now keeps $55K more every year with proper planning.</p>
                <div className="results-card__metrics">
                  <div className="results-card__metric results-card__metric--before">
                    <p className="results-card__metric-label">Before</p>
                    <p className="results-card__metric-value">45% rate</p>
                  </div>
                  <div className="results-card__metric results-card__metric--after">
                    <p className="results-card__metric-label">After</p>
                    <p className="results-card__metric-value">22% rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="results-carousel__row" id="carousel-row-2">
            <div className="results-card">
              <div className="results-card__avatar">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Executive portrait" />
              </div>
              <div className="results-card__content">
                <span className="results-card__type">Executive • $1M+ Income</span>
                <h3 className="results-card__headline">$44M net worth projection</h3>
                <p className="results-card__text">Making $1M/year with only $2.3M net worth. His pension wasn&apos;t invested.</p>
                <div className="results-card__metrics">
                  <div className="results-card__metric results-card__metric--before">
                    <p className="results-card__metric-label">Current</p>
                    <p className="results-card__metric-value">$2.3M</p>
                  </div>
                  <div className="results-card__metric results-card__metric--after">
                    <p className="results-card__metric-label">Projected</p>
                    <p className="results-card__metric-value">$44M</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="results-card">
              <div className="results-card__avatar">
                <img src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=200&h=200&fit=crop&crop=face" alt="Real estate agent portrait" />
              </div>
              <div className="results-card__content">
                <span className="results-card__type">Realtor • $400K Revenue</span>
                <h3 className="results-card__headline">$120K kept vs lost</h3>
                <p className="results-card__text">From paying 50% on $120K to keeping it all. Same income, different result.</p>
                <div className="results-card__metrics">
                  <div className="results-card__metric results-card__metric--before">
                    <p className="results-card__metric-label">Before</p>
                    <p className="results-card__metric-value">$60K kept</p>
                  </div>
                  <div className="results-card__metric results-card__metric--after">
                    <p className="results-card__metric-label">After</p>
                    <p className="results-card__metric-value">$120K kept</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="results-card">
              <div className="results-card__avatar">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face" alt="Tech founder portrait" />
              </div>
              <div className="results-card__content">
                <span className="results-card__type">Tech Founder • $500K</span>
                <h3 className="results-card__headline">$2.1M preserved on exit</h3>
                <p className="results-card__text">Set up family trust before exit. Saved $2.1M in capital gains tax.</p>
                <div className="results-card__metrics">
                  <div className="results-card__metric results-card__metric--before">
                    <p className="results-card__metric-label">Without</p>
                    <p className="results-card__metric-value">$5.9M</p>
                  </div>
                  <div className="results-card__metric results-card__metric--after">
                    <p className="results-card__metric-label">With</p>
                    <p className="results-card__metric-value">$8M</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="results-card">
              <div className="results-card__avatar">
                <img src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=200&h=200&fit=crop&crop=face" alt="Therapist portrait" />
              </div>
              <div className="results-card__content">
                <span className="results-card__type">Therapist • $180K</span>
                <h3 className="results-card__headline">$32K saved year one</h3>
                <p className="results-card__text">Professional corp + proper structure = $32K more in her pocket annually.</p>
                <div className="results-card__metrics">
                  <div className="results-card__metric results-card__metric--before">
                    <p className="results-card__metric-label">Before</p>
                    <p className="results-card__metric-value">$90K kept</p>
                  </div>
                  <div className="results-card__metric results-card__metric--after">
                    <p className="results-card__metric-label">After</p>
                    <p className="results-card__metric-value">$122K kept</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="results-card">
              <div className="results-card__avatar">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" alt="Contractor portrait" />
              </div>
              <div className="results-card__content">
                <span className="results-card__type">Contractor • $350K</span>
                <h3 className="results-card__headline">$85K tax reduction</h3>
                <p className="results-card__text">From writing cheques to CRA to keeping that money in his family.</p>
                <div className="results-card__metrics">
                  <div className="results-card__metric results-card__metric--before">
                    <p className="results-card__metric-label">Before</p>
                    <p className="results-card__metric-value">$140K tax</p>
                  </div>
                  <div className="results-card__metric results-card__metric--after">
                    <p className="results-card__metric-label">After</p>
                    <p className="results-card__metric-value">$55K tax</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="results-carousel__cta">
            <a href="https://calendly.com/wealthbridgeto/30min?month=2026-01" className="btn btn--primary btn--large">Get Your Free Keep Rate Audit</a>
            <a href="#" className="btn btn--outline btn--large" data-open-modal="course-modal">Take the Free Course</a>
          </div>
        </div>
      </section>

      {/* FOUNDER LETTER */}
      <section className="founder section" id="founder">
        <div className="container">
          <div className="founder__card fade-in">
            <div className="founder__logo-header">
              <div className="founder__logo-line"></div>
              <img src="images/wealthbridge-icon.png" alt="WealthBridge" className="founder__logo-icon" />
              <div className="founder__logo-line"></div>
            </div>

            <p className="founder__greeting">Hi there,</p>

            <div className="founder__story">
              <div>
                I left my job as an Ontario Treasury Board Analyst to build something of my own. My first year in business, I earned just over $200,000. It felt like success, until tax season, when a huge portion disappeared.
              </div>
              <div>
                <br />
                My business counterpart, same market, earned seven figures and kept most of it. The difference wasn&apos;t effort. It was structure.
              </div>
              <div>
                <br />I was too &quot;small&quot; for private wealth firms. Too complex for bank advice. No one explained how tax, incorporation, and planning work together. So, I learned the hard way, and made expensive mistakes along the way.
              </div>
              <div>
                <br />
                But those mistakes taught me something: wealth isn&apos;t just built by earning more. It&apos;s built by keeping more.
              </div>
              <div>
                <br />
                As a first-generation Iranian Canadian immigrant, I&apos;d already spent my life navigating systems that weren&apos;t designed for people like me. I knew what it felt like to be overlooked or pushed into cookie-cutter solutions.
              </div>
              <div>
                <br />
                And I saw it happening everywhere—to women entrepreneurs, visible minorities, and other immigrants.
              </div>
              <div>
                <br />
                That&apos;s why I founded Wealth Bridge Consulting.
              </div>
              <div>
                <br />
                We close the wealth gap between what you earn and what you keep, by designing smarter structures without the guesswork. We shift the decision power back to you, where it belongs.
              </div>
              <div>
                <br />
                If you&apos;ve built a successful business but feel like wealth should be easier, you&apos;re not behind. You&apos;re ready for a better framework.
              </div>
              <div>
                <br />
                We offer a complimentary Keep Rate Audit to show you where wealth may be quietly leaking. No pressure. Just clarity.
              </div>
              <div>
                <br />
                Your success isn&apos;t a transaction. It&apos;s a transformation.
                <br />
                <br />
              </div>
            </div>

            <div className="founder__signature-area">
              <svg className="founder__signature-svg" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 45 Q 30 10, 50 40 T 90 35 Q 110 30, 130 38 T 170 30 Q 185 25, 195 35"
                      stroke="#1A2B4A" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>

              <div className="founder__signature-details">
                <div className="founder__signature-photo">
                  <img src="https://cdn.builder.io/api/v1/image/assets%2F44e3e188e75945c7957b904ccda3f1ae%2Fc1b2746894e54131b1ae91e0d6c8a0f0" alt="Behi Shafiei" />
                </div>
                <div>
                  <p className="founder__signature-name">Behi Shafiei</p>
                  <p className="founder__signature-title">Founder & CEO, WealthBridge Consulting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOTTED CONNECTOR */}
      <div className="dotted-connector"></div>

      {/* HOW IT WORKS */}
      <section className="process section" id="process">
        <div className="container">
          <div className="process__header">
            <p className="eyebrow">What You Get With WealthBridge</p>
            <h2>Your Plan to Keep More Wealth</h2>
          </div>
          <div className="process__layout">
            <div className="process__cards">
              <div className="process-card">
                <h3 className="process-card__title">Your Free Keep Rate Audit</h3>
                <p className="process-card__text">A comprehensive analysis of where your money is going. We identify every drain — taxes, structure, cash flow, interest — and show you exactly how much you&apos;re losing annually.</p>
              </div>
              <div className="process-card">
                <h3 className="process-card__title">Your Plan to Keep More Wealth</h3>
                <p className="process-card__text">A personalized strategy to fix the drains first. Corporate structure, and tax optimization strategies, and every other lever available to stop losing 50 cents on every dollar.</p>
              </div>
              <div className="process-card">
                <h3 className="process-card__title">Your Plan to Grow More Wealth</h3>
                <p className="process-card__text">Once you&apos;re keeping more, we put it to work. Investment strategies, compound growth vehicles, and tax-free growth mechanisms that accelerate your path to financial freedom.</p>
              </div>
              <div className="process-card">
                <h3 className="process-card__title">Your Team to Manage It All — For Life</h3>
                <p className="process-card__text">Accountants, lawyers, insurance advisors, investment managers — all coordinated under one roof. Succession planning, your children&apos;s education, charitable giving, estate planning. One point of contact. We handle everything.</p>
              </div>
            </div>
            <div className="process__circles">
              <div className="circles-wrapper">
                <div className="circle circle--outer">
                  <span className="circle__label">Full Network</span>
                  <span className="circle__sublabel">Lawyers. Accountants. Specialists.</span>
                </div>
                <div className="circle circle--middle">
                  <span className="circle__label">Your Wealth Plan</span>
                  <span className="circle__sublabel">Tax. Insurance. Investments.</span>
                </div>
                <div className="circle circle--inner">
                  <span className="circle__label">You</span>
                  <span className="circle__sublabel">One Point of Contact</span>
                </div>
              </div>
            </div>
          </div>
          <div className="process__cta">
            <p className="process__cta-text">Want to learn more?</p>
            <a href="https://calendly.com/wealthbridgeto/30min?month=2026-01" className="btn btn--white btn--large">Get Your Free Keep Rate Audit</a>
            <a href="#" className="link process__cta-link" data-open-modal="course-modal">Or learn how to keep more wealth →</a>
          </div>
        </div>
      </section>

      {/* INTERESTED? SECTION */}
      <section className="interested section" id="interested">
        <div className="container">
          <div className="interested__header">
            <h2>Let&apos;s Talk</h2>
          </div>
          <div className="interested__box fade-in">
            <h3 className="interested__box-title">This is for you if...</h3>
            <ul className="interested__list">
              <li className="interested__item">
                <span className="interested__item-bullet"></span>
                <span>You believe (like us) that <strong>business owners are the foundation of Canada&apos;s economy</strong></span>
              </li>
              <li className="interested__item">
                <span className="interested__item-bullet"></span>
                <span>You believe the ultra-wealthy <strong>shouldn&apos;t be the only ones who get to build generational wealth</strong></span>
              </li>
              <li className="interested__item">
                <span className="interested__item-bullet"></span>
                <span>You&apos;re a Canadian business owner with an <strong>incorporated business</strong></span>
              </li>
              <li className="interested__item">
                <span className="interested__item-bullet"></span>
                <span>You make <strong>more than you need to live on</strong> and have retained earnings sitting in your corporation</span>
              </li>
              <li className="interested__item">
                <span className="interested__item-bullet"></span>
                <span>You&apos;re ready to <strong>stop accepting &quot;that&apos;s just how taxes work&quot;</strong> as an answer</span>
              </li>
            </ul>
            <div className="interested__cta">
              <a href="https://calendly.com/wealthbridgeto/30min?month=2026-01" className="btn btn--secondary btn--large">Get Your Free Keep Rate Audit</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq section" id="faq">
        <div className="container">
          <div className="faq__header">
            <p className="eyebrow">Questions</p>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq__list">
            <div className="faq-item">
              <button className="faq-item__question">
                How is Wealth Bridge different from my bank&apos;s wealth management?
                <span className="faq-item__icon">+</span>
              </button>
              <div className="faq-item__answer">
                <div className="faq-item__answer-inner">
                  Banks typically focus on investment management — deploying money after it&apos;s already flowed through your personal tax return. Wealth Bridge starts differently: we look at your full financial ecosystem — how income is earned, how it flows through your corporation, how many layers of tax it passes through. Our focus is your keep rate before layering in growth strategies. We coordinate across tax, corporate structure, liquidity, and investment strategy — ensuring decisions are aligned, sequenced, and intentional. For business owners with growing complexity, that coordination is often the missing piece.
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-item__question">
                What does insurance have to do with wealth building?
                <span className="faq-item__icon">+</span>
              </button>
              <div className="faq-item__answer">
                <div className="faq-item__answer-inner">
                  In Canada, certain types of permanent life insurance — when structured properly — can play a strategic role in long-term wealth planning. For incorporated business owners, corporate-owned permanent insurance may offer a tax-advantaged environment for long-term growth, the ability to position retained earnings to reduce tax friction, and flexibility around liquidity and estate planning. Growth inside the policy is tax-deferred, access to value can be structured through policy loans, and proceeds may flow through the Capital Dividend Account (CDA) for tax-free distributions. At Wealth Bridge, we use insurance selectively — as one layer within a coordinated Wealth Stack, alongside tax strategy, corporate structure, and investments.
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-item__question">
                Is this legal? It sounds too good to be true.
                <span className="faq-item__icon">+</span>
              </button>
              <div className="faq-item__answer">
                <div className="faq-item__answer-inner">
                  Yes — when done properly, these strategies are legal and well-established within Canadian tax law. The planning approaches we use — including corporate structuring, tax deferral mechanisms, and permanent insurance — are grounded in existing Canadian legislation and CRA-recognized frameworks. They&apos;ve been used by business owners and families for decades. What matters is how they&apos;re implemented: structured correctly, aligned with CRA rules, and coordinated with professional tax and legal advice. We emphasize proper documentation, transparency, and suitability based on your specific situation. Good planning should feel clear, not risky or rushed.
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-item__question">
                How does Wealth Bridge make money?
                <span className="faq-item__icon">+</span>
              </button>
              <div className="faq-item__answer">
                <div className="faq-item__answer-inner">
                  We focus on creating financial clarity first, and only move forward if there&apos;s a meaningful opportunity to help. That&apos;s why the Keep Rate Audit is complimentary — it allows us to understand your situation and determine whether coordinated planning could materially improve your outcome. If we don&apos;t see a clear way to add value, we&apos;ll tell you. When clients do choose to work with us, compensation may come from the implementation of planning strategies (such as insurance-based solutions) and ongoing investment management, if engaged. Our incentive is long-term outcomes and relationships, not volume.
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-item__question">
                How much do I need to get started?
                <span className="faq-item__icon">+</span>
              </button>
              <div className="faq-item__answer">
                <div className="faq-item__answer-inner">
                  There&apos;s no single number — what matters most is surplus cash flow. These strategies become relevant once your business consistently generates more than you need to live on personally. Our work is best suited for Canadian business owners who generate $500K–$10M in annual gross business income and have built a net worth of $3M+ (including real estate), or are clearly on that trajectory. The scale matters — but structure, timing, and intent matter more. The Keep Rate Audit helps determine whether these strategies are suitable now, how much surplus exists, and whether planning would meaningfully improve your outcome.
                </div>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-item__question">
                Why should I trust Wealth Bridge with my wealth?
                <span className="faq-item__icon">+</span>
              </button>
              <div className="faq-item__answer">
                <div className="faq-item__answer-inner">
                  Trust in wealth planning comes from alignment, independence, and process — not promises. We work with a multidisciplinary team of professionals with over 50 years of combined experience, including Certified Financial Planners, financial analysts, accountants, and insurance specialists. We&apos;re not tied to a single bank or provider — we partner with all major Canadian banks and leading insurance companies, allowing us to recommend solutions based on fit, not affiliation. The strategies we discuss aren&apos;t theoretical — they&apos;re approaches we&apos;ve implemented thoughtfully and refined through real-world experience. We begin with the Keep Rate Audit to determine whether working together would meaningfully improve your position. If it won&apos;t, we&apos;ll tell you.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta section" id="cta">
        <div className="container">
          <div className="cta__inner">
            <p className="eyebrow" style={{ color: 'var(--gold)' }}>Take the First Step</p>
            <h2 className="cta__title">What&apos;s your Keep Rate?</h2>
            <p className="subtitle cta__subtitle">Find out how much money you&apos;re losing every year — and get a free plan to keep more of it.</p>
            <div className="cta__buttons">
              <a href="https://calendly.com/wealthbridgeto/30min?month=2026-01" className="btn btn--primary btn--large">Get Your Free Keep Rate Audit</a>
            </div>
            <p className="cta__note">Takes 30 minutes. No obligation. If we can&apos;t help, we&apos;ll tell you.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div className="footer__brand">
              <div className="footer__logo">
                <img src="https://cdn.builder.io/api/v1/image/assets%2F44e3e188e75945c7957b904ccda3f1ae%2Fb1ad0089dd5444539cbdfb50e72949d9" alt="WealthBridge" className="footer__logo-img" />
              </div>
              <p className="footer__tagline">Raising the Keep Rate for Canadian business owners. The same strategies the ultra-wealthy have used for decades — now accessible to you.</p>
            </div>
            <div className="footer__links">
              <div className="footer__column">
                <h4>Company</h4>
                <ul>
                  <li><a href="#founder">About Behi</a></li>
                  <li><a href="#solution">Our Approach</a></li>
                  <li><a href="#results">Client Results</a></li>
                  <li><a href="https://calendly.com/wealthbridgeto/30min?month=2026-01">Contact</a></li>
                </ul>
              </div>
              <div className="footer__column">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#problem">Keep Rate</a></li>
                  <li><a href="#process">How It Works</a></li>
                  <li><a href="#faq">FAQ</a></li>
                  <li><a href="https://calendly.com/wealthbridgeto/30min?month=2026-01">Book a Call</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copyright">© 2025 WealthBridge Consulting. All rights reserved.</p>
            <div className="footer__legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
          <div className="footer__disclaimer">
            <strong>Disclaimer:</strong> WealthBridge Consulting is regulated by the Financial Services Regulatory Authority of Ontario. The information provided on this website is for educational purposes only and should not be considered financial, tax, or legal advice. All figures and projections shown are estimates based on individual circumstances. Please consult with qualified professionals before making any financial decisions. Past results do not guarantee future performance.
          </div>
        </div>
      </footer>

      {/* COURSE MODAL */}
      <div className="modal-overlay" id="course-modal">
        <div className="modal">
          <button className="modal__close" aria-label="Close modal">&times;</button>
          <div className="modal__form" id="course-form-container">
            <h3 className="modal__title">Get the Free 5-Day Course</h3>
            <p className="modal__description">Learn the exact strategies the ultra-wealthy use to keep more of every dollar they earn. We&apos;ll send you one actionable lesson per day for 5 days.</p>
            <form id="course-form">
              <div className="modal__form">
                <input type="email" name="email" className="modal__input" placeholder="Enter your email address" required />
                <button type="submit" className="modal__submit">Send Me the Course</button>
              </div>
            </form>
          </div>
          <div className="modal__success" id="course-success">
            <div className="modal__success-icon">✓</div>
            <h3 className="modal__success-title">You&apos;re In!</h3>
            <p className="modal__success-text">Check your email — we&apos;ve just sent you a confirmation with information on the free course. Your first lesson is on its way!</p>
          </div>
        </div>
      </div>
    </>
  )
}
