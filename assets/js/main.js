
//SEZIONE NAVBAR
//Gestisco il menu che al click sul "burger menu" appare e scopare in caso di visualizzazione su mobile
$(document).ready(function () {
  $(".navbarToggle").click(function (e) {
    e.stopPropagation();
    $(".mainNav").toggleClass("active");
  });
});

//recupero da remoto il file JSON contenente i dettagli del film
let path = "https://api.jsonbin.io/b/5fc40160045eb86f1f889fd1";
fetch(path)
.then(response => response.json())
.then(function (details) {
  //console.log("JSON.stringify(jsonObject): "+JSON.stringify(jsonObject));
  details.databaseFilm.forEach(element => {
     
    //se l'elemento set corrisponde a nowCinema, inserisci qua il film
    if (element.set == "nowCinema") {
      //SEZIONE ORA AL CINEMA
      let postOraInSala = document.querySelector("#postOraInSala");
      // div generale
      let macroContainerOIS = document.createElement("div");
      //div per immagine e titolo
      let filmContainerOIS = document.createElement("div");

      macroContainerOIS.appendChild(filmContainerOIS);
      macroContainerOIS.classList.add("col-sm");

      //LOCANDINA
      let imgContainerOIS = document.createElement("div");
      filmContainerOIS.appendChild(imgContainerOIS);
      //immagine locandina
      let locandinaOIS = document.createElement("img");
      locandinaOIS.srcset = element.img;
      locandinaOIS.addEventListener('click', function(){buildSchedaFilm(element.id,details)}, false);
      locandinaOIS.classList.add("imgOraInSala");
      imgContainerOIS.append(locandinaOIS);
      //TESTO
      let textContainerOIS = document.createElement("div");
      textContainerOIS.classList.add("description");
      filmContainerOIS.appendChild(textContainerOIS);
      //titolo
      let titoloOIS = document.createElement("h6");
      titoloOIS.innerHTML = element.title;
      titoloOIS.classList.add("titleFilm");
      textContainerOIS.append(titoloOIS);

      postOraInSala.append(macroContainerOIS);

      //altrimenti se l'elmento.set non corrisponde a nowCinema, inserisci qua il film
    } else {
      //SEZIONE PROSSIMAMENTE
      let postProssimamente = document.querySelector("#postProssimamente");
      // div generale
      let macroContainerP = document.createElement("div");
      //div per immagine e titolo
      let filmContainerP = document.createElement("div");

      macroContainerP.appendChild(filmContainerP);
      macroContainerP.classList.add("col-sm");

      //LOCANDINA
      let imgContainerP = document.createElement("div");
      filmContainerP.appendChild(imgContainerP);
      //immagine locandina
      let locandinaP = document.createElement("img");
      locandinaP.srcset = element.img;
      //associo al click sulla locandina la funzione buildSchedaFilm
      //locandinaP.onclick=function(){buildSchedaFilm(element.id,details)};
      locandinaP.addEventListener('click', function(){buildSchedaFilm(element.id,details)}, false);
      locandinaP.classList.add("imgOraInSala");
      imgContainerP.append(locandinaP);
      //TESTO
      let textContainerP = document.createElement("div");
      textContainerP.classList.add("description");
      filmContainerP.appendChild(textContainerP);
      //titolo
      let titoloP = document.createElement("h6");
      titoloP.innerHTML = element.title;
      titoloP.classList.add("titleFilm");
      textContainerP.append(titoloP);
        
      postProssimamente.append(macroContainerP);
    };
  });
})
//gestisco l'eventuale errore nel recupero del file
.catch(error => innerHTML = error + " Qualcosa non ha funzionato.");

//SCHEDA FILM
//creo la scheda film al click sulla locandina se l'ement.id corrisponde all'id della locandina
function buildSchedaFilm(id, details) {
  //console.log(details);
  //console.log(id);
  details.databaseFilm.forEach(element => {
    if (element.id == id) {
      let macroContainerSF = document.createElement("div");
      let filmContainerSF = document.createElement("div");
      let textContainerSF = document.createElement("div");
      let videoContainerSF = document.createElement("div");
      let reviewContainerSF = document.createElement("div");
  
      macroContainerSF.appendChild(filmContainerSF);
      macroContainerSF.appendChild(videoContainerSF);
      macroContainerSF.appendChild(textContainerSF);
      macroContainerSF.appendChild(reviewContainerSF);
      macroContainerSF.classList.add("containerSF");
  
      //div per titolo
      let onlyTitleSF = document.createElement("div");
      filmContainerSF.appendChild(onlyTitleSF);
      //titolo
      let titleSF = document.createElement("h4");
      titleSF.innerHTML = element.title;
      titleSF.classList.add("titleSF");
      onlyTitleSF.append(titleSF);
  
      //div per video
      let videoSF = document.createElement("div");
      videoContainerSF.appendChild(videoSF);
      videoSF.classList.add("trilerSF");
      //triler
      let trilerSF = document.createElement("iframe");
      videoSF.append(trilerSF);
      trilerSF.outerHTML = element.media;
  
      //div per informazioni generali
      let generalInfoSF = document.createElement("div");
      textContainerSF.appendChild(generalInfoSF);
      // uscita in italia
      let dateSF = document.createElement("p");
      dateSF.innerHTML = "Uscita in Italia: " + element.exitIta
      dateSF.classList.add("dateSF");
      generalInfoSF.append(dateSF);
      //anno
      let yearSF = document.createElement("p");
      yearSF.innerHTML = "Anno di uscita: " + element.year;
      yearSF.classList.add("yearSF");
      generalInfoSF.append(yearSF);
      //durata
      let timeSF = document.createElement("p");
      timeSF.innerHTML = "Durata: " + element.time;
      timeSF.classList.add("timeSF");
      generalInfoSF.append(timeSF);
      //stelle
      let ratingsSF = document.createElement("p");
      ratingsSF.innerHTML = "Valutazione: " + element.ratings;
      ratingsSF.classList.add("ratingsSF");
      generalInfoSF.append(ratingsSF);
      //genere
      let genresSF = document.createElement("p");
      genresSF.innerHTML = "Genere: " + element.genres;
      genresSF.classList.add("genresSF");
      generalInfoSF.append(genresSF);
      //autore
      let authorSF = document.createElement("p");
      authorSF.innerHTML = "Prodotto da: " + element.author;
      authorSF.classList.add("authorSF");
      generalInfoSF.append(authorSF);
      //collaborazione
      let collaborationSF = document.createElement("p");
      collaborationSF.innerHTML = "Con la collaborazione di: " + element.collaboration;
      collaborationSF.classList.add("collaborationSF");
      generalInfoSF.append(collaborationSF);
      //distibuzione
      let distributionSF = document.createElement("p");
      distributionSF.innerHTML = "Distribuito da: " + element.distribution;
      distributionSF.innerHTML = "<hr>";
      distributionSF.classList.add("distributionSF");
      generalInfoSF.append(distributionSF);
  
      //div per recensione
      let reviewDivSF = document.createElement("div");
      reviewContainerSF.appendChild(reviewDivSF);
      //recensione
      let reviewSF = document.createElement("p");
      reviewSF.innerHTML = "Trama: <br>" + element.review;
      reviewSF.classList.add("reviewSF");
      reviewDivSF.append(reviewSF);
  
      //contenitore bottone di back
      let btnContainer = document.createElement("div");
      macroContainerSF.appendChild(btnContainer);
      let backBtn = document.createElement("button");
      btnContainer.append(backBtn);
      backBtn.innerHTML = "Torna alla lista";
      backBtn.classList.add("buttonSF");
      backBtn.onclick=function(){returnList(id)};
  
      document.getElementById('forSchedaFim').style.display = "none";
      document.body.append(macroContainerSF);
  
      //nascondo i valori a cui non è stato associato nulla e che mi restituirebbero undefined
      if (element.time == undefined) {
        timeSF.style.display = "none";
      } if (element.genres == undefined) {
        genresSF.style.display = "none";
      } if (element.author == undefined) {
        authorSF.style.display = "none";
      } if (element.exitIta == undefined) {
        dateSF.style.display = "none";
      } if (element.collaboration == undefined) {
        collaborationSF.style.display = "none";
      } if (element.distribution == undefined) {
        distributionSF.style.display = "none";
      };
      //funzione che permette il ritorno alla lista film
      function returnList(id){
        if (document.getElementById('forSchedaFim').style.display = "none") {
          macroContainerSF.style.display = "none";
          document.getElementById('forSchedaFim').style.display = "unset";
          //per tornare alla sezione su cui si è fatto il click
          if (id < 22){
            location.href = "#oraInSala";
          }else{
            location.href = "#prossimamente";
          };
        };
      };
    };
  });
};

//SEZIONE NEWSLETTER
//Gestione del click su bottone Iscriviti
function manageClick() {
  document.getElementById("onClickNewsletter").innerHTML = "Email registrata correttamente<br>Grazie per esserti iscritto";
};