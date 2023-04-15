const textAreaMessage = document.getElementById("text-message");
const textAreaCrypted = document.getElementById("text-crypted");
const selectInput = document.getElementById("select-input");
const buttonCopy = document.getElementById("button-copy");
const buttonTrash = document.getElementById("button-trash");
const textCopy = document.getElementById("text-copy");
const emptyAlert = document.querySelector(".empty-alert");

const state = {
  message: "",
  encryptedMessage: "",
  selected: "encrypt",
};

function render() {
  textAreaMessage.value = state.message;
  textAreaCrypted.value = state.encryptedMessage;
  selectInput.value = state.selected;

  if (state.message === "") {
    emptyAlert.style.display = "flex";
  } else {
    emptyAlert.style.display = "none";
  }
}

const ENCRYPTION_KEYS = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

function encripter(msg) {
  const msgArray = msg.split("");
  const msgEncrypter = msgArray.map((letter) => {
    for (const [key, value] of Object.entries(ENCRYPTION_KEYS)) {
      if (letter === key) return value;
    }
    return letter;
  });
  return msgEncrypter.join("");
}

function decryptor(msg) {
  return Object.entries(ENCRYPTION_KEYS).reduce((acc, [key, value]) => {
    const msgDecrypter = acc.replaceAll(value, key);
    return msgDecrypter;
  }, msg);
}

buttonTrash.addEventListener("click", () => {
  state.message = "";
  state.encryptedMessage = "";
  render();
});

buttonCopy.addEventListener("click", () => {
  const copy = navigator.clipboard.writeText(textAreaCrypted.value);
  copy.then(() => {
    buttonCopy.classList.add("animation-copy");
    setTimeout(() => {
      buttonCopy.classList.remove("animation-copy");
    }, 4000);
  });
});

selectInput.addEventListener("change", (event) => {
  const option = event.target.value;
  state.selected = option;
  changeSelectValue(state.message);
  return render();
});

textAreaMessage.addEventListener("input", (event) => {
  const newMessage = event.target.value;
  state.message = newMessage;
  changeSelectValue(newMessage);
  render();
});

function changeSelectValue(msg) {
  if (state.selected === "encrypt")
    return (state.encryptedMessage = encripter(msg));
  if (state.selected === "decrypt")
    return (state.encryptedMessage = decryptor(msg));
}
