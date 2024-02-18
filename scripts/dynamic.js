const dynamicLoadHTMLFile = (page) => {
  fetch(page)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("container").innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading the HTML file:", error);
    });
};
