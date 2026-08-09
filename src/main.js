const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const FORM_STOREGE_KEY = "feedbak-form-promo";
const form = document.querySelector('.promo-form');
const hrefButtons = document.querySelectorAll('.hrefBtn');

hrefButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
  window.location.href = './store.html';
});
})

  


['dragover', 'dragenter'].forEach(eventType => {
  dropZone.addEventListener(eventType, (e) => {
    e.preventDefault();
    dropZone.classList.add('form-drop--over');
  });
});

['dragleave', 'dragend', 'drop'].forEach(eventType => {
  dropZone.addEventListener(eventType, () => {
    dropZone.classList.remove('form-drop--over');
  });
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  
  if (e.dataTransfer.files.length) {
    fileInput.files = e.dataTransfer.files;
    updateDropZoneText(e.dataTransfer.files[0].name);
  }
});

fileInput.addEventListener('change', () => {
  if (fileInput.files.length) {
    updateDropZoneText(fileInput.files[0].name);
  }
});

function updateDropZoneText(fileName) {
  const textEl = dropZone.querySelector('.form-drop-text');
  const hintEl = dropZone.querySelector('.form-drop-hint');
  textEl.textContent = `Выбран файл: ${fileName}`;
  hintEl.textContent = '';
}

const formData = {
  name: "",
  email: "",
  image: "",
  checked: ""
};
saveForm();

form.addEventListener('input', (event) => {
  if (event.target.type === "checkbox") return;

  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(FORM_STOREGE_KEY, JSON.stringify(formData))
});

form.elements.checked.addEventListener('change', (event) => {
  formData.checked = event.target.checked ? 'true' : "";
  event.target.value = formData.checked;
  localStorage.setItem(FORM_STOREGE_KEY, JSON.stringify(formData));
})

function saveForm() {
  const storeData = localStorage.getItem(FORM_STOREGE_KEY);

  if (storeData) {
    try {
      const curData = JSON.parse(storeData);

      formData.name = curData.name || "";
      formData.email = curData.email || "";
      formData.image = curData.image || "";
      formData.checked = curData.checked || "";

      form.elements.name.value = formData.name;
      form.elements.email.value = formData.email;
      form.elements.image.value = formData.image;
      form.elements.checked.value = formData.checked;

    } catch (error) {
      console.log("неправильное добавление данных из localStore", error);
    }
  };

};
const dropImageText = document.querySelector('.form-drop-text');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (formData.name === "" || formData.email === "" || formData.image === "" || formData.checked === "") {
    alert("Заполните все поля");
    return
  } 
  console.log(formData);

  localStorage.removeItem(FORM_STOREGE_KEY);
  
  dropImageText.innerHTML = 'Прикрепить скриншот';

  event.target.reset();
  
})
