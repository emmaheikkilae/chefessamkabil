// Mobile nav toggle
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // Gallery filter tabs
  var tabs = document.querySelectorAll(".filter-tab");
  var items = document.querySelectorAll(".g-item");
  if (tabs.length && items.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var cat = tab.getAttribute("data-filter");
        items.forEach(function (item) {
          var show = cat === "all" || item.getAttribute("data-category") === cat;
          item.classList.toggle("show", show);
        });
      });
    });
  }

  // Reveal "please specify" box when Occasion Type is set to Other
  var occasionSelect = document.getElementById("occasion-select");
  var occasionOtherWrap = document.getElementById("occasion-other-wrap");
  if (occasionSelect && occasionOtherWrap) {
    occasionSelect.addEventListener("change", function () {
      occasionOtherWrap.style.display = occasionSelect.value === "Other" ? "block" : "none";
    });
  }

  // Reveal "please describe" box when Dietary "Other" checkbox is checked
  var dietaryOtherCheck = document.getElementById("dietary-other-check");
  var dietaryOtherWrap = document.getElementById("dietary-other-wrap");
  if (dietaryOtherCheck && dietaryOtherWrap) {
    dietaryOtherCheck.addEventListener("change", function () {
      dietaryOtherWrap.style.display = dietaryOtherCheck.checked ? "block" : "none";
    });
  }

  // Booking / testimonial form submission (client-side placeholder)
  // NOTE: This demo intercepts submit and shows a confirmation message.
  // To actually receive submissions by email, replace the <form> action
  // with a form backend such as Netlify Forms (see README) or Formspree.
  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      // If Netlify Forms attributes are present and the site is deployed on
      // Netlify, let the form submit normally (remove this block in that case).
      e.preventDefault();
      var confirmBox = document.querySelector(form.getAttribute("data-confirm-target"));
      form.style.display = "none";
      if (confirmBox) confirmBox.classList.add("show");
    });
  });
});
