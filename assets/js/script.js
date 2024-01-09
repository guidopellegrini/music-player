const wrapper = document.querySelector(".wrapper"),
  musicImg = wrapper.querySelector("img"),
  musicName = wrapper.querySelector(".name"),
  musicArtist = wrapper.querySelector(".artist"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  prevBtn = wrapper.querySelector("#prev"),
  nextBtn = wrapper.querySelector("#next"),
  mainAudio = wrapper.querySelector("#main-audio"),
  progressArea = wrapper.querySelector(".progress-area"),
  progressBar = wrapper.querySelector(".progress-bar"),
  currentTime = wrapper.querySelector(".current-time"),
  maxDuration = wrapper.querySelector(".max-duration");

//Definimos el indice de una cancion aleatoria
let musicIndex = Math.floor(Math.random() * allMusic.length + 1);

//Pausamos la música inicialmente
isMusicPaused = true;

//Esta función carga la música, cuando se carga la ventana
window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

//Carga la música
function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `assets/images/${allMusic[indexNumb - 1].img}.jpg`;
  mainAudio.src = `assets/songs/${allMusic[indexNumb - 1].src}.mp3`;
}

//Reproducir música
function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.innerHTML = '<i class="fi fi-sr-pause"></i>';
  mainAudio.play();
}

//Pausar música
function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.innerHTML = '<i class="fi fi-sr-play"></i>';
  mainAudio.pause();
}

//Siguiente canción
function nextMusic() {
  musicIndex++;
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  // Si el indice de la canción es mayor que la cantidad de canciones, entonces el indice de la canción es 1, sino, el indice de la canción es el indice de la canción
  loadMusic(musicIndex);
  playMusic();
}

//Anterior canción
function prevMusic() {
  musicIndex--;
  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
  // Si el indice de la canción es menor que 1, entonces el indice de la canción es la cantidad de canciones, sino, el indice de la canción es el indice de la canción
  loadMusic(musicIndex);
  playMusic();
}

//Reproducir o pausar la música
playPauseBtn.addEventListener("click", () => {
  const isMusicPlay = wrapper.classList.contains("paused");
  // Si la música está pausada, entonces reproducir la música, sino, pausar la música
  isMusicPlay ? pauseMusic() : playMusic();
});

//Siguiente canción
nextBtn.addEventListener("click", () => {
  nextMusic();
});

//Anterior canción
prevBtn.addEventListener("click", () => {
  prevMusic();
});

//Cancion terminada
mainAudio.addEventListener("ended", () => {
  nextMusic();
});

//-------------------------------------------------------------
//Actualizar la barra de progreso de la música
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTimeActual = e.target.currentTime; //Obtenemos el tiempo actual de la canción en segundos

  const durationActual = e.target.duration; //Obtenemos la duración de la canción en segundos

  let progressWidth = (currentTimeActual / durationActual) * 100; //Calculamos el porcentaje de la barra de progreso

  progressBar.style.width = `${progressWidth}%`; //Actualizamos la barra de progreso

  //Actualizamos el tiempo actual de la canción
  let currentMin = Math.floor(currentTimeActual / 60);
  let currentSec = Math.floor(currentTimeActual % 60);
  if (currentSec < 10) {
    //Si los segundos son menores a 10, entonces agregamos un 0 al inicio
    currentSec = `0${currentSec}`;
  }
  currentTime.innerText = `${currentMin}:${currentSec}`;
});

//Actualizamos el tiempo actual de la canción
mainAudio.addEventListener("loadeddata", () => {
  //Actualizamos la duración de la canción
  let audioDuration = mainAudio.duration;
  let totalMin = Math.floor(audioDuration / 60);
  let totalSec = Math.floor(audioDuration % 60);
  if (totalSec < 10) {
    //Si los segundos son menores a 10, entonces agregamos un 0 al inicio
    totalSec = `0${totalSec}`;
  }
  maxDuration.innerText = `${totalMin}:${totalSec}`;
});

//Actualizamos la barra de progreso de la música al hacer click en ella
progressArea.addEventListener("click", (e) => {
  let progressWidthVal = progressArea.clientWidth; //Obtenemos el ancho de la barra de progreso
  let clickedOffsetX = e.offsetX; //Obtenemos el offsetX de la barra de progreso
  let songDuration = mainAudio.duration; //Obtenemos la duración de la canción

  mainAudio.currentTime = (clickedOffsetX / progressWidthVal) * songDuration; //Actualizamos el tiempo actual de la canción
  playMusic(); //Reproducimos la música
});

//-------------------------------------------------------------
//Draggable Progress Bar Desktop
const audio = document.getElementById("main-audio");

let isDragging = false;

progressArea.addEventListener("mousedown", function (e) {
  isDragging = true;
  updateProgress(e);
});

document.addEventListener("mousemove", function (e) {
  if (isDragging) {
    updateProgress(e);
  }
});

document.addEventListener("mouseup", function () {
  isDragging = false;
});

function updateProgress(e) {
  const progressArea = document.querySelector(".progress-area");
  const newPosition = e.clientX - progressArea.getBoundingClientRect().left;
  const progressPercentage = (newPosition / progressArea.clientWidth) * 100;

  if (progressPercentage >= 0 && progressPercentage <= 100) {
    progressBar.style.width = progressPercentage + "%";
    audio.currentTime = (progressPercentage / 100) * audio.duration;
  }
}

//-------------------------------------------------------------
//Draggable Progress Bar Mobile
progressArea.addEventListener("touchstart", function (e) {
  isDragging = true;
  updateProgressMobile(e);
});

document.addEventListener("touchmove", function (e) {
  if (isDragging) {
    updateProgressMobile(e);
  }
});

document.addEventListener("touchend", function () {
  isDragging = false;
});

function updateProgressMobile(e) {
  const progressArea = document.querySelector(".progress-area");
  const newPosition = e.touches[0].clientX - progressArea.getBoundingClientRect().left;
  const progressPercentage = (newPosition / progressArea.clientWidth) * 100;

  if (progressPercentage >= 0 && progressPercentage <= 100) {
    progressBar.style.width = progressPercentage + "%";
    audio.currentTime = (progressPercentage / 100) * audio.duration;
  }

  playMusic();
}

//-------------------------------------------------------------

// Para fixear la diferencia de altura de pantalla en mobile
// cuando se abre/cierra el menu del navegador (en iOS/Android)
const appHeight = () => {
  const vh = window.innerHeight * 0.01;
  this.document.documentElement.style.setProperty("--vh", `${vh}px`);
};
window.addEventListener("resize", appHeight);

appHeight();
