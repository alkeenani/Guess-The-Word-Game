export function showPopUp(title, message) {
  const containerPopUp = document.createElement("div");
  const closeBtn = document.createElement("button");
  const overlay = document.createElement("div");
  const heading = document.createElement("h2");
  const description = document.createElement("p");

  heading.textContent = title;
  description.textContent = message;
  closeBtn.innerHTML = "&times;";

  document.body.append(overlay, containerPopUp);
  containerPopUp.append(heading, description, closeBtn);

  containerPopUp.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(.8);
    width: 420px;
    max-width: 90%;
    padding: 35px 30px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 20px 50px rgba(0,0,0,.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    z-index: 1001;
    opacity: 0;
    transition: .35s ease;
    font-family: Arial, sans-serif;
  `;

  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.55);
    backdrop-filter: blur(4px);
    z-index: 1000;
    opacity: 0;
    transition: .35s ease;
  `;

  heading.style.cssText = `
    margin:0;
    color:#222;
    font-size:30px;
    font-weight:bold;
  `;

  description.style.cssText = `
    margin:0;
    color:#666;
    font-size:18px;
    text-align:center;
    line-height:1.6;
  `;

  closeBtn.style.cssText = `
    position:absolute;
    top:12px;
    right:12px;
    width:35px;
    height:35px;
    border:none;
    border-radius:50%;
    background:#ff4d4f;
    color:#fff;
    font-size:22px;
    cursor:pointer;
    transition:.3s;
  `;

  closeBtn.onmouseenter = () => {
    closeBtn.style.background = "#d9363e";
    closeBtn.style.transform = "rotate(90deg)";
  };

  closeBtn.onmouseleave = () => {
    closeBtn.style.background = "#ff4d4f";
    closeBtn.style.transform = "rotate(0)";
  };

  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
    containerPopUp.style.opacity = "1";
    containerPopUp.style.transform = "translate(-50%, -50%) scale(1)";
  });

  function closePopup() {
    overlay.style.opacity = "0";
    containerPopUp.style.opacity = "0";
    containerPopUp.style.transform = "translate(-50%, -50%) scale(.8)";

    setTimeout(() => {
      overlay.remove();
      containerPopUp.remove();
    }, 350);
  }

  closeBtn.addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup);
}
