const initializeLogin = () => {
  document.getElementById("login-btn").onclick = () => {
    document.getElementById("login-dialog").style.display = "block";
  };

  document.querySelector(".close-button").onclick = () => {
    document.getElementById("login-dialog").style.display = "none";
  };

  window.onclick = (event) => {
    let modal = document.getElementById("login-dialog");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  document.getElementById("login-form").onsubmit = (event) => {
    event.preventDefault(); // Prevent form submission to demonstrate functionality
    alert("Login attempted");
  };
};

document.addEventListener("DOMContentLoaded", initializeLogin);
