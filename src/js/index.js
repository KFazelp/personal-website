const DEFAULT_COLOR = "#37E2D5";
const DEFAULT_TITLE = "Personal Website";
const contentBox = document.getElementById("content-box");
const ICON_SIZE = "16px";

const generateUI = (data) => {
  document.title = data.title || DEFAULT_TITLE;

  Object.values(data.content).forEach((record) => {
    const element = document.createElement(record.link ? "a" : "div");
    if (record.link) {
      element.setAttribute("href", record.link);
      element.setAttribute("target", "_blank");
    }
    element.innerHTML = record.text;
    if (record.style)
      Object.entries(record.style).forEach(([key, value]) => {
        element.style[key] = value;
      });
    contentBox.appendChild(element);
  });

  if (data.links) {
    Object.entries(data.links).forEach(([key, value]) => {
      if (key !== "socials") {
        const link = document.createElement("div");
        link.classList.add("flex-box");
        link.innerHTML = `<div class="icon-${key}" style="font-size: 12px"></div><div style="font-size: 16px">${
          key[0].toUpperCase() + key.slice(1)
        }:</div><a href="${
          key === "phone" ? "tel:" : key === "email" ? "mailto:" : ""
        }${value.replaceAll(" ", "")}" style="font-size: 16px">${value}</a>`;
        link.style.marginTop = "10px";
        contentBox.appendChild(link);
      } else {
        const socials = document.createElement("div");
        socials.classList.add("flex-box");
        Object.entries(value).forEach(([name, link]) => {
          const socialLink = document.createElement("a");
          socialLink.setAttribute("href", link);
          socialLink.setAttribute("target", "_blank");
          socialLink.classList.add(`icon-${name}`);
          socialLink.style.fontSize = ICON_SIZE;
          socials.appendChild(socialLink);
        });
        socials.style.marginTop = "25px";
        contentBox.appendChild(socials);
      }
    });
  }

  const theme = document.createElement("style");
  let colors = `--primary: ${DEFAULT_COLOR}; --text: white; `;
  if (data.theme)
    Object.entries(data.theme).forEach(([key, value]) => {
      colors += `--${key}: ${value}; `;
    });
  theme.innerHTML = `.theme {${colors}}`;
  document.body.appendChild(theme);
};

fetch("content/content.json")
  .then((response) => response.json())
  .then((data) => generateUI(data));
