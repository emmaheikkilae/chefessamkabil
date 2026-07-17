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

  // Show the relevant follow-up question based on which service is selected:
  // Every service involves food, so the ingredients question applies to all of
  // them; Multi-Day Meal Prep additionally asks about location/containers.
  var serviceSelect = document.getElementById("service-select");
  var ingredientsWrap = document.getElementById("ingredients-wrap");
  var mealprepWrap = document.getElementById("mealprep-wrap");
  if (serviceSelect && ingredientsWrap && mealprepWrap) {
    serviceSelect.addEventListener("change", function () {
      ingredientsWrap.style.display = serviceSelect.value ? "block" : "none";
      mealprepWrap.style.display = serviceSelect.value === "meal-prep" ? "block" : "none";
    });
  }

  // Submit forms to Netlify Forms via AJAX, so we can show an in-page
  // confirmation instead of navigating to a new page.
  document.querySelectorAll("form[data-ajax-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Build a real, populated email subject line from the actual field
      // values (Netlify's dashboard subject field can't reference submitted
      // data directly — a hidden "subject" input in the form is the only
      // way to make the subject line dynamic).
      var subjectField = form.querySelector('input[name="subject"]');
      if (subjectField) {
        var formName = form.getAttribute("name");
        if (formName === "booking") {
          var bName = (form.elements["name"] || {}).value || "someone";
          var bGuests = (form.elements["guests"] || {}).value || "?";
          var bStart = (form.elements["event_start_date"] || {}).value || "";
          var bEnd = (form.elements["event_end_date"] || {}).value || "";
          var bDates = bEnd ? (bStart + "\u2013" + bEnd) : bStart;
          var bServiceEl = form.elements["service"];
          var bService = bServiceEl && bServiceEl.selectedIndex > -1
            ? bServiceEl.options[bServiceEl.selectedIndex].text
            : "";
          subjectField.value = "\uD83D\uDCC5 New Booking from " + bName + " for " + bGuests + " guests, " + bDates + " \u2014 " + bService;
        } else if (formName === "testimonial") {
          var tName = (form.elements["name"] || {}).value || "someone";
          var tTypeEl = form.elements["event_type"];
          var tType = tTypeEl && tTypeEl.selectedIndex > -1
            ? tTypeEl.options[tTypeEl.selectedIndex].text
            : "";
          var tRatingEl = form.elements["rating"];
          var tRating = tRatingEl && tRatingEl.selectedIndex > -1
            ? tRatingEl.options[tRatingEl.selectedIndex].text
            : "";
          subjectField.value = "\u2B50 New Testimonial from " + tName + " \u2014 " + tType + " \u2014 " + tRating;
        }
      }

      var submitBtn = form.querySelector("button[type=submit]");
      var originalBtnText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending..."; }

      var formData = new FormData(form);
      fetch("/", {
        method: "POST",
        body: formData
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Network response was not ok");
          var confirmBox = document.querySelector(form.getAttribute("data-confirm-target"));
          form.style.display = "none";
          if (confirmBox) confirmBox.classList.add("show");
        })
        .catch(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Something went wrong — please try again"; }
          setTimeout(function () {
            if (submitBtn) { submitBtn.textContent = originalBtnText; }
          }, 3000);
        });
    });
  });
});
