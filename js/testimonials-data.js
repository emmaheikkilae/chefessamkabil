// ============================================================
// Shared testimonial data — the single source of truth.
//
// Edit this array to add, remove, or reorder testimonials.
// Both the Home page and the Testimonials page read from here,
// so you only ever update ONE place.
//
// Fields:
//   stars       - number from 1 to 5
//   quote       - the review text (no quotation marks needed, added automatically)
//   name        - reviewer's name as you want it displayed
//   eventType   - "Catering" / "Cooking Lesson" / "Private Chef" / etc.
//   featured    - set true on exactly ONE entry to feature it in the big
//                 highlighted box at the top of the Testimonials page
//   showOnHome  - set true to include it in the 3-card preview on the
//                 Home page (only the first 3 marked true will show there)
// ============================================================
window.TESTIMONIALS = [
  {
    id: "t1",
    stars: 5,
    quote: "Chef Essam did our anniversary dinner at home and it was better than any restaurant we've been to. The French sauces alone were worth it.",
    name: "Marie T.",
    eventType: "Private Dinner",
    featured: true,
    showOnHome: true
  },
  {
    id: "t2",
    stars: 5,
    quote: "We booked him for a cooking class with six friends and it turned into the best girls' night we've had in years. He made crêpe-making feel effortless.",
    name: "Danielle R.",
    eventType: "Cooking Lesson",
    featured: false,
    showOnHome: true
  },
  {
    id: "t3",
    stars: 5,
    quote: "Corporate holiday party, 40 guests, dietary needs all over the map — he handled it without a single complaint. Professional and warm.",
    name: "James K.",
    eventType: "Catering",
    featured: false,
    showOnHome: true
  },
  {
    id: "t4",
    stars: 5,
    quote: "Essam made the entire private chef experience feel effortless and special. From the start, the menu felt thoughtful and personalized, especially for a French bistro–style celebration for four guests. The meal was beautifully prepared, the chocolate mousse was a standout, and every detail reflected real care and professionalism. It was the perfect way to celebrate a new job and create a memorable evening at home.",
    name: "Essam O.",
    eventType: "Private Chef",
    featured: false,
    showOnHome: true
  }
];

function starString(n) {
  return "\u2605".repeat(Math.max(0, Math.min(5, n)));
}

function renderTestimonialCard(t) {
  return (
    '<div class="t-card">' +
      '<div class="stars">' + starString(t.stars) + "</div>" +
      '<p class="quote">&quot;' + t.quote + '&quot;</p>' +
      '<div class="t-meta">' + t.name + " \u2014 " + t.eventType + "</div>" +
    "</div>"
  );
}

function renderFeaturedTestimonial(t) {
  return (
    '<div class="t-featured">' +
      '<div class="stars">' + starString(t.stars) + "</div>" +
      '<p class="quote">&quot;' + t.quote + '&quot;</p>' +
      '<div class="t-meta">' + t.name + " \u2014 " + t.eventType + "</div>" +
    "</div>"
  );
}

// Renders testimonials into the given container elements.
// options:
//   featuredEl      - element to receive the single featured testimonial
//   gridEl          - element to receive a row of .t-card testimonials
//   excludeFeatured - if true, the featured one is left out of the grid
//   onHomeOnly      - if true, only entries with showOnHome:true are used
//   limit           - max number of cards to show in the grid
function mountTestimonials(options) {
  options = options || {};
  var data = window.TESTIMONIALS || [];

  if (options.featuredEl) {
    var featured = data.filter(function (t) { return t.featured; })[0];
    if (featured) options.featuredEl.innerHTML = renderFeaturedTestimonial(featured);
  }

  if (options.gridEl) {
    var list = data;
    if (options.excludeFeatured) list = list.filter(function (t) { return !t.featured; });
    if (options.onHomeOnly) list = list.filter(function (t) { return t.showOnHome; });
    if (options.limit) list = list.slice(0, options.limit);
    options.gridEl.innerHTML = list.map(renderTestimonialCard).join("");
  }
}
