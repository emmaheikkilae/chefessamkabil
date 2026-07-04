# Chef Essam Kabil — Website

A static HTML/CSS/JS site, ready to deploy on Netlify.

## Pages
- `index.html` — Home
- `about.html` — About / biography + career timeline
- `services.html` — Catering, Cooking Lessons, Private Chef
- `gallery.html` — Filterable photo gallery (currently placeholders)
- `testimonials.html` — Reviews + submission form
- `contact.html` — Booking form

## 1. Deploy to Netlify (no coding needed)

**Easiest path — drag and drop:**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the whole `chef-essam-site` folder onto the page
3. Netlify gives you a live URL in seconds (e.g. `random-name-123.netlify.app`)
4. In **Site settings → Domain management**, you can rename the subdomain or connect a custom domain (e.g. `chefessamkabil.com`)

**Alternative — connect a Git repo (better for ongoing edits):**
1. Push this folder to a new GitHub repository
2. In Netlify: **Add new site → Import an existing project → GitHub** → select the repo
3. Leave build settings blank (no build command needed — it's static HTML)
4. Deploy

Every time you push a change to GitHub, Netlify redeploys automatically.

## 2. Add your real photos

Every photo on the site is currently a labeled placeholder (a soft ivory box with an icon and a filename hint, e.g. `images/french-01.jpg`). To swap one in:

1. Add your image file to the `images/` folder, named to match the hint shown on the placeholder (or any name you prefer)
2. In the relevant `.html` file, find the placeholder block, which looks like:
   ```html
   <div class="g-photo">
     <span class="g-icon">🥐</span>
     <span class="g-hint">images/french-01.jpg</span>
   </div>
   ```
3. Replace it with:
   ```html
   <div class="g-photo">
     <img src="images/french-01.jpg" alt="Coq au vin plated tableside">
   </div>
   ```
   Always fill in a descriptive `alt` text — it helps both accessibility and SEO.

**Image tips:** compress to under ~200KB per photo (e.g. with [squoosh.app](https://squoosh.app)), use `.webp` or `.jpg`, and keep a consistent aspect ratio within a row for the cleanest gallery look.

## 3. Make the forms actually send you emails

Right now, the booking and testimonial forms show a friendly confirmation message but **don't send anywhere** — that's `js/main.js` intercepting the submit for demo purposes.

The easiest fix, since you're on Netlify, is **Netlify Forms** (free, no backend needed):

1. In `contact.html`, find the `<form data-demo-form ...>` tag and change it to:
   ```html
   <form name="booking" method="POST" data-netlify="true" netlify-honeypot="bot-field">
     <input type="hidden" name="form-name" value="booking">
   ```
2. Do the same in `testimonials.html` (use `name="testimonial"` instead)
3. Remove the `data-demo-form` attribute from both (or leave `main.js` as-is — the browser will still POST the form to Netlify on submit as long as you don't call `e.preventDefault()`, so simplest is to delete the matching block in `js/main.js`, or just remove `data-demo-form` so that block never attaches)
4. Redeploy. After your first deploy, go to **Netlify dashboard → Forms** — every submission will appear there, and you can turn on **email notifications** to send them straight to `essamkabil@yahoo.com`

Alternatives if you'd rather not use Netlify Forms: [Formspree](https://formspree.io) or [Basin](https://usebasin.com) both work by just changing the form's `action` attribute — no code changes needed beyond that.

## 4. Editing text

All copy lives directly in the `.html` files — open any page in a text editor (or even directly on GitHub) and edit the text between tags. No build step, no compiling — just save and redeploy (or it redeploys automatically if you're connected via Git).

## 5. Colors & fonts

Everything is controlled from the top of `css/style.css`:
```css
:root {
  --bordeaux: #6B1F2A;
  --ivory: #F7F1E8;
  --brass: #B8925A;
  --charcoal: #2B2E38;
}
```
Change any of these hex values and the whole site updates.

## 6. Connect the real Instagram account

Every `REPLACE_WITH_HANDLE` in the code (footer links on all pages, plus the feed section on `gallery.html`) needs Essam's real Instagram username. Find-and-replace `REPLACE_WITH_HANDLE` with the actual handle (e.g. `chefessamkabil`) across all files — most code editors and GitHub both support "replace in all files."

To show a **live, auto-updating grid of his actual posts** (not just a link) on the Gallery page:
1. Sign up for a free embed widget — [SnapWidget](https://snapwidget.com) or [Elfsight](https://elfsight.com) both work well and don't require a developer account
2. Connect Essam's Instagram account through the widget's dashboard and pick a grid layout
3. Copy the `<iframe>` or `<script>` snippet they give you
4. In `gallery.html`, find the six placeholder tiles inside `<div class="masonry ig-grid">` and replace the whole block with the pasted snippet

## 7. SEO basics already included
- Unique `<title>` and `<meta description>` on every page
- Semantic heading structure (one `<h1>` per page)
- `alt` text placeholders ready for your images
- Fast-loading — no frameworks, just plain HTML/CSS/JS

Once live, submit your sitemap/URL to Google Search Console and set up a free Google Business Profile for local search ("private chef Jacksonville," etc).
