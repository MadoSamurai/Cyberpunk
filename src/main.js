const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');

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
    // Привязываем сброшенный файл к нашему input
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