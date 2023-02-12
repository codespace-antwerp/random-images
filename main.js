let imageFiles;
let imageIndex = 0;

function shuffleList(l) {
  for (let i = l.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [l[i], l[j]] = [l[j], l[i]];
  }
  return l;
}

async function main() {
  const res = await fetch("./files.txt");
  imageFiles = (await res.text()).trim().split("\n");
  imageFiles = shuffleList(imageFiles);
  imageIndex = 0;
  showRandomImage();
  installKeyListener();
}

function showRandomImage() {
  const randomImage = imageFiles[imageIndex];
  const mainImageEl = document.getElementById("main-image");
  mainImageEl.src = `/images/${randomImage}`;
  mainImageEl.style.display = "block";
  document.getElementById("loader").style.display = "none";
  imageIndex++;
  if (imageIndex >= imageFiles.length) {
    imageFiles = shuffleList(imageFiles);
    imageIndex = 0;
  }
}

function installKeyListener() {
  window.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      showRandomImage();
    }
  });
}

main();
