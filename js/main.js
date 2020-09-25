$(document).ready(function() {

  //evento per click su button
  $("#trova").click(function(event){
    //imposto una variabile per ricercare
    var searchMovie = $("#search").val();
    //richiamo la funzione per ripulire il campo ricercare
    refresh();
    //richiamo la funzione per chiamata ajax
    callMovie(searchMovie);
    callSeries(searchMovie);
  });
  //evento per ricerca con tasto Invio
  $("#search").keypress(function(event){
    //imposto una variabile per ricercare
    var searchMovie = $("#search").val();
    //richiamo la funzione per ripulire il campo html
    if(event.which == 13) {
      refresh();
      callMovie(searchMovie);
      callSeries(searchMovie);
    }
  })
})


//FUNZIONI UTILIZZATE
//funzione per la chiamata ajax dei film
function callMovie(searchString) {

//imposto la chiamata ajax
  $.ajax(
    {
    //collego l'API
      "url": "https://api.themoviedb.org/3/search/movie",
      "data": {
      //inserisco i dati richiesti per Boolfix
        "api_key": "8daa01d92ef3f575dadf0aab8dfe1e77",
        "query": searchString,
        "language": "it-IT",

      },
      "method": "GET",
      "success": function(data) {
      //richiamo la funzione che ritorna i dati del film ricercato
        renderResults( "film" , data.results);
      },
      "error" : function(err) {
        alert("Errore!");
      },
    }
  );
}


//funzione per chiamata ajax delle serie tv
function callSeries(searchString) {
//imposto la chiamata ajax
  $.ajax(
    {
    //collego l'API
      "url": "https://api.themoviedb.org/3/search/tv",
      "data": {
      //inserisco i dati richiesti per Boolfix
        "api_key": "8daa01d92ef3f575dadf0aab8dfe1e77",
        "query": searchString,
        "language": "it-IT"
      },
      "method": "GET",
      "success": function(data) {
      //richiamo la funzione che ritorna i dati del film ricercato
        renderResults( "tv" , data.results);
      },
      "error" : function(err) {
        alert("Errore!");
      },
    }
  );
}

//funzione che ritorna il template per il listato dei movies
function renderResults(type, results) {
  //creo il template
  var source = $("#movie-template").html();
  var template = Handlebars.compile(source);

  //stampo  film ricevuti dalla chiamata api
  for (var i = 0; i < results.length; i++) {

    var title, original_title;
    //creo un ciclo per suddividere i risultati per tipologia film o serie Tv
    if(type == "film") {
      title = results[i].title;
      original_title = results[i].original_title;
      //creo variabile container per contenere i rispettivi risultati
      var container = $("#list-movies");
    } else if(type == "tv") {
      title = results[i].name;
      original_title = results[i].original_name;
      var container = $("#list-series");
    };

    //creo variabile peril poster dei film/serie tv

    if(results[i].poster_path == null){
      var poster = "img/no_image.png";
    } else {
      var poster = "https://image.tmdb.org/t/p/w185" + results[i].poster_path;
    };

    //creo context del template listato movies
    var context = {
      "poster": poster,
      "title": title,
      "original_title": original_title,
      "language": flags(results[i].original_language),
      "voti": stars(results[i].vote_average),
      "type": type
    };

    //preparo html per inserire html
    var html = template(context);
    //vado ad agganciarlo al mio html
    container.append(html);
  };
}

//funzione per ripulire i campi
function refresh () {
  //pulisco il campo lista ogni volta
  $(".list-movies").html("");
  $(".list-series").html("");
  //pulisco il campo ricercare
  $("#search").html("");
}

//funzione che stampa una ricerca senza risultati
function notFound(type) {
  //creo il template
  var source = $("#not-found-template").html();
  var template = Handlebars.compile(source);

  var container;
  //appendo il risultto not found in base al risultato
  if(type == "film") {
    container = $("#list-series");
  } else if( type == "tv") {
    container = $("#list-movies");
  };
  //preparo html per inserire html
  var html = template(context);
  //vado ad agganciarlo al mio html
  container.append(html);
}
//funzione per ridurre il punteggio dei voti da 1 a 5 e sostituirlo con una stella piena <i class="fas fa-star"></i> o una stella vuota <i class="far fa-star"></i>
function stars(num) {
  //riduco il voto da 1 a 5
  var num =  Math.ceil(num / 2);
  //creo una stringa per l'icona della stella ecreo un ciclo per stamparne tante quante il voto
  var string = " ";
  for ( var i = 1; i <= 5; i++) {

    if(i <= num) {
      string = string + "<i class='fas fa-star'></i>";
    } else {
      string = string + "<i class='far fa-star'></i>";
    };

  }
  return string;
}

// funzione per sostituire la bandiera alla Lingua
function flags(language) {
  var flags = [
    "it",
    "en"
  ];

  if (flags.includes(language)) {
    return "<img class= 'flag' src='img/" +language+ ".svg'>";
  }
  return language;
}
