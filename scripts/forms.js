const dynamicLoadPage = (page) => {
    fetch(`pages/${page}.html`)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("container").innerHTML = html;
        const newUrl = page === "home" ? "/" : `/${page}.html`;
        history.pushState({ page }, "", newUrl);
      })
      .catch((error) => {
        console.error("Error loading the HTML file:", error);
      });
  };

  
  document.addEventListener("DOMContentLoaded", () => {
    const currentPage = getCurrentPage();
    dynamicLoadPage(currentPage);
  });
  