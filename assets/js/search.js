let fuse;
let resList = document.getElementById("searchResults");
let sInput = document.getElementById("searchInput");
let i18nEl = document.getElementById("i18n-strings");
let i18n = i18nEl ? i18nEl.dataset : {};

if (sInput) {
  window.addEventListener("load", function () {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            let data = JSON.parse(xhr.responseText);
            if (data) {
              fuse = new Fuse(data, {
                keys: ["title", "summary", "content"],
                threshold: 0.4,
                ignoreLocation: true,
                distance: 100,
              });
              // Search existing input in case user typed before load
              if (sInput.value.trim()) {
                sInput.dispatchEvent(new Event("input"));
              }
            }
          } catch (e) {
            resList.innerHTML =
              '<li class="search-empty">' +
              (i18n.searchUnavailable || "Search index unavailable.") +
              "</li>";
          }
        } else {
          resList.innerHTML =
            '<li class="search-empty">' +
            (i18n.searchUnavailable || "Search index unavailable.") +
            "</li>";
        }
      }
    };
    xhr.open("GET", "../index.json");
    xhr.send();
  });

  sInput.addEventListener("input", function () {
    let term = this.value.trim();
    if (!fuse || !term) {
      resList.innerHTML = "";
      return;
    }
    let results = fuse.search(term, { limit: 10 });
    if (results.length === 0) {
      resList.innerHTML =
        '<li class="search-empty">' +
        (i18n.noResults || "No results found.") +
        "</li>";
      return;
    }
    resList.innerHTML = results
      .map(function (r) {
        let item = r.item;
        let summary = item.summary || "";
        if (summary.length > 120)
          summary = summary.substring(0, 120) + "\u2026";
        return (
          '<li class="post-entry"><a href="' +
          escapeAttr(item.permalink) +
          '">' +
          '<h3 class="post-entry-title">' +
          escapeHtml(item.title) +
          "</h3>" +
          (summary
            ? '<p class="post-entry-summary">' + escapeHtml(summary) + "</p>"
            : "") +
          "</a></li>"
        );
      })
      .join("");
  });

  sInput.addEventListener("search", function () {
    if (!this.value) resList.innerHTML = "";
  });
}

function escapeHtml(str) {
  let d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function escapeAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && sInput) {
    sInput.value = "";
    if (resList) resList.innerHTML = "";
    sInput.focus();
  }
  if (e.key === "/" && sInput && document.activeElement !== sInput) {
    e.preventDefault();
    sInput.focus();
  }
});
