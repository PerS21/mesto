export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escClosePopup);
  popup.addEventListener("mousedown", clickClosePopup);
}

export function closePopup() {
  const popup = document.querySelector(".popup_is-opened");
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("mousedown", clickClosePopup);
  document.removeEventListener("keydown", escClosePopup);
}

function escClosePopup(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

function clickClosePopup(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("popup__close-button")
  ) {
    closePopup();
  }
}
