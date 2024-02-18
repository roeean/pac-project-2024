const navigationItems = [
  {
    href: "/home.html",
    text: "Home",
    icon: ["fas", "fa-house"],
  }, {
    href: "/about.html",
    text: "About Us",
    icon: ["fas", "fa-address-card"],
  }, {
    href: "/forms/register-employee.html",
    text: "Register Employee",
    icon: ["fas", "fa-user-plus"],
  }, {
    href: "/forms/schedule.html",
    text: "Shifts Schedule",
    icon: ["fas", "fa-calendar-alt"],
  }, {
    href: "/forms/attendance.html",
    text: "Attendance Update",
    icon: ["fas", "fa-user-clock"],
  }, {
    href: "/forms/report.html",
    text: "Monthly Report",
    icon: ["fas", "fa-file-alt"],
  },{
    href: "/forms/support.html",
    text: "Support",
    icon: ["fas", "fa-headset"],
  },
];

const socialItems = [
  {
    href: "https://www.facebook.com",
    icon: ["fab", "fa-facebook-f"],
  },
  {
    href: "https://www.instagram.com",
    icon: ["fab", "fa-instagram"],
  },
  {
    href: "https://www.twitter.com",
    icon: ["fab", "fa-twitter"],
  },
  {
    href: "https://www.linkedin.com",
    icon: ["fab", "fa-linkedin-in"],
  },
];

const createMenuItem = ({ href, text, icon }, isWithIcons) => {
  const listItem = document.createElement("li");
  listItem.classList.add("menu-item");

  const link = document.createElement("a");
  link.classList.add("menu-link");
  link.href = href;
  link.textContent = text;

  if (isWithIcons && icon) {
    const iconElement = document.createElement("i");
    iconElement.classList.add(...icon);
    link.insertAdjacentElement("afterbegin", iconElement);
  }

  listItem.appendChild(link);

  if (href === window.location.pathname) {
    listItem.classList.add("active");
  }

  return listItem;
};

const createNav = ({ items = [], isWithIcons = false } = {}) => {
  const menuList = document.createElement("ul");
  menuList.classList.add("menu", "flex");

  items.forEach((item) => {
    const menuItem = createMenuItem(item, isWithIcons);
    menuList.appendChild(menuItem);
  });

  return menuList;
};

const initializeNavigation = () => {
  const navContainer = document.getElementById("header-nav");
  const footerNavContainer = document.getElementById("footer-nav");
  const socialNavContainer = document.getElementById("social-nav");

  if (navContainer) {
    const navMenu = createNav({
      items: navigationItems,
      isWithIcons: true,
    });
    navContainer.appendChild(navMenu);
  }

  if (footerNavContainer) {
    const footerNavMenu = createNav({
      items: navigationItems,
    });
    footerNavContainer.appendChild(footerNavMenu);
  }

  if (socialNavContainer) {
    const socialMenu = createNav({
      items: socialItems,
      isWithIcons: true,
    });
    socialNavContainer.appendChild(socialMenu);
  }
};

document.addEventListener("DOMContentLoaded", initializeNavigation);
