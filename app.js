// Je sélectionne tous mes éléments
const affichageTravail = document.querySelector('.affichageT');
const affichagePause = document.querySelector('.affichageP');
const btnStart = document.querySelector('.b1');
const btnPause = document.querySelector('.b2');
const btnReset = document.querySelector('.b3');
const cycles = document.querySelector('h2');

// je crée mes constantes de temps
let tempsInitial = 1800; // il s'agit du temps en secondes soit 30 min
let tempsDeRepos = 300; // 5 min
let pause = false; // false car de base on n'est pas en pause
let nbDeCycles = 0; // 0 car de base on a pas définit de cycle
let checkInterval = false; // false par defaut

// on affiche le nombre de cycles
cycles.innerText = `Nombre de cycles ${nbDeCycles}`;

// on affichage le temps en minutes et secondes du workout
// Math.trunc = limite a 2 chiffres.
// tempsInitial/60 = pour avoir le temps en minutes
// puis aprés les :, operation ternaire.
// SI le modulo 60 du temps initial est inférieur a 10 secondes ALORS rajouter un 0 devant pour conserver 2 chiffres SINON afficher le modulo 60
affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
affichagePause.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;


// J'écoute le click sur mon bouton start
btnStart.addEventListener('click', () => {

  if(checkInterval === false) {
    checkInterval = true;

    // je décrémente de 1 a chaque click et j'actualise le nombre
    tempsInitial--;
    affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
  
    // je crée un timer avec setInterval pour décrémenter automatiquement
    let timer = setInterval(() => {
  
      if(pause === false && tempsInitial > 0) {
        tempsInitial--;
        affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
      }
      else if (pause === false && tempsDeRepos === 0 && tempsInitial === 0) {
        tempsInitial = 1800;
        tempsDeRepos = 300;
        nbDeCycles++;
        cycles.innerText = `Nombre de cycles ${nbDeCycles}`;
        affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
        affichagePause.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;
      }
      else if (pause === false && tempsInitial === 0) {
        tempsDeRepos--;
        affichagePause.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;
      }
  
  
    },1000) // ici la durée de l'intervalle soit 1000 ms = 1s

    // j'écoute mon bouton reset
    btnReset.addEventListener('click', () => {
      clearInterval(timer); // j'enleve l'intervalle du timer
      checkInterval = false; // je remet mon intervalle a false comme au depart
      tempsInitial = 1800; // je remt mon temps initial a la bonne valeur
      tempsDeRepos = 300; // idem pour le temps de repos
      
      // idem pour l'affichage de départ
      affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
      affichagePause.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;
  
    })
  } else {
      return;
  }

  
})

// j'écoute l'événement de mon bouton pause
btnPause.addEventListener('click',() => {

  if(pause === false) {
    btnPause.innerText = 'Play';
  } else if (pause === true) {
    btnPause.innerText = 'Pause';
  }
  pause = !pause;
})