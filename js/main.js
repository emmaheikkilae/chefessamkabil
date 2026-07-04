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

  // Submit forms to Netlify Forms via AJAX, so we can show an in-page
  // confirmation instead of navigating to a new page.
  document.querySelectorAll("form[data-ajax-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
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
