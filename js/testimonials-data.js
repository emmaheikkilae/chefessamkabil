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
// No testimonials are published yet — real client reviews will be added here
// as they come in (the submission form on testimonials.html feeds this).
//
// To add a review, copy the template below into the array, fill it in, and
// remove the leading "//" from each line. The Home page and Testimonials
// page will pick it up automatically, and the "no reviews yet" placeholder
// will disappear on its own once at least one entry is present.
//
//   {
//     id: "t1",
//     stars: 5,                     // 1 to 5
//     quote: "Their words here.",   // no quotation marks needed — added automatically
//     name: "First name L.",
//     eventType: "Private Chef",    // Catering / Cooking Lesson / Private Chef / Multi-Day Meal Prep
//     featured: true,               // set true on exactly ONE entry for the top highlight box
//     showOnHome: true              // set true to include in the 3-card Home page preview
//   },
window.TESTIMONIALS = [
  // (empty for now — add approved client reviews using the template above)
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
//   emptyHTML       - markup to show on the Testimonials page when there are
//                     no reviews yet (rendered into featuredEl, or gridEl)
//   hideEl          - element to hide entirely when there are no reviews yet
//                     (used on the Home page to drop the whole preview section)
function mountTestimonials(options) {
  options = options || {};
  var data = window.TESTIMONIALS || [];

  // Nothing published yet — degrade gracefully instead of leaving blank gaps.
  if (data.length === 0) {
    if (options.hideEl) { options.hideEl.style.display = "none"; return; }
    if (options.emptyHTML) {
      var target = options.featuredEl || options.gridEl;
      if (target) target.innerHTML = options.emptyHTML;
      return;
    }
  }

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
