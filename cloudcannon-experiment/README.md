# WealthBridge CloudCannon

CloudCannon-ready static website for WealthBridge Consulting.

## Structure

```
cloudcannon-experiment/
├── cloudcannon.config.json    # CloudCannon configuration
├── index.html                 # Homepage
├── _data/                     # JSON data files (editable in CloudCannon)
│   ├── site.json              # Global site settings
│   ├── navigation.json        # Navigation links
│   ├── footer.json            # Footer content
│   ├── testimonials.json      # Quick proof testimonials
│   ├── results.json           # Results carousel data
│   ├── faq.json               # FAQ questions and answers
│   ├── homepage.json          # Homepage-specific content
│   ├── free_course.json       # Free course landing page content
│   ├── book_audit.json        # Book audit landing page content
│   └── course_confirm.json    # Course confirmation page content
├── assets/
│   ├── css/
│   │   └── styles.css         # All styles
│   └── js/
│       └── main.js            # JavaScript functionality
└── landing/                   # Landing pages
    ├── free-course.html       # Free 5-day course signup
    ├── book-audit.html        # Book a free Keep Rate audit
    └── course-confirm.html    # Course signup confirmation
```

## Pages

- **Homepage** (`index.html`) - Main marketing page with all sections
- **Free Course** (`landing/free-course.html`) - Email course signup with curriculum
- **Book Audit** (`landing/book-audit.html`) - Booking page for free audit calls
- **Course Confirm** (`landing/course-confirm.html`) - Thank you page after course signup

## Color Codes

```css
/* Primary Colors */
--navy: #0D0D0D;
--navy-light: #1A1A1A;
--navy-dark: #000000;

/* Gold/Accent */
--gold: #C4A962;
--gold-light: #D4BE7A;
--gold-dark: #A89050;
--gold-accessible: #8A6F3D;

/* Sage/Green */
--sage: #BABFAE;
--sage-light: #C8CCBF;
--sage-dark: #A1A697;
--green: #6B7566;

/* Brown */
--brown: #5C4A32;

/* Neutrals */
--cream: #F2F0EB;
--cream-dark: #D9D6D2;
--slate: #3D3D3D;
--slate-light: #5A5A5A;
--white: #FFFFFF;
--muted: #666666;
```

## Font Families

```css
/* Display/Headings */
--font-display: 'Source Serif 4', Georgia, serif;

/* Body Text */
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

## Google Fonts URL

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:wght@400;600;700&display=swap" rel="stylesheet">
```

## Setup with CloudCannon

1. Push this repository to GitHub
2. Connect the repository to CloudCannon
3. CloudCannon will automatically detect the `cloudcannon.config.json`
4. Edit content via the visual editor or data files
5. Changes sync back to the repository

## Data Binding

The HTML uses `data-cms-bind` attributes to connect elements to JSON data files:

```html
<h1 data-cms-bind="#homepage.hero.title">...</h1>
<p data-cms-bind="#free_course.hero.subtitle">...</p>
```

This allows visual editing in CloudCannon's interface.

## Section Background Classes

```css
.section--cream   /* Light cream background */
.section--white   /* White background */
.section--sage    /* Sage green background */
.section--brown   /* Brown background with white text */
.section--navy    /* Dark navy background with white text */
```

## Landing Page Features

### Free Course Page
- Email signup form with webhook support
- 5-day curriculum display
- Instructor bio section
- Audience targeting cards
- Social proof testimonials

### Book Audit Page
- Booking widget embed area (Calendly/GoHighLevel)
- Benefits grid
- Client testimonials with results
- Audience checklist
- Process steps

### Course Confirm Page
- Success confirmation
- Next steps checklist
- CTA to book audit

## Form Integration

The free course form supports webhook integration:

1. Set `webhook_url` in `_data/free_course.json` or via CloudCannon
2. Form submits via POST with `no-cors` mode
3. Redirects to `course-confirm.html` on completion

## Placeholder Images

Currently using Unsplash placeholders. Replace with actual client images in CloudCannon.
