$(document).ready(function() {
  //imposto una variabile per ricercare
  var searchMovie="Ritorno al futuro";

  //imposto la chiamata ajax
  $.ajax(
    {
      //collego l'API
      "url": "https://api.themoviedb.org/3/search/movie",
      "data": {
        //inserisco i dati richiesti per Boolfix
        "api_key": "8daa01d92ef3f575dadf0aab8dfe1e77",
        "query": searchMovie,
        "language": "it-IT"
      },
      "method": "GET",
      "success": function(data) {
        //richiamo la funzione che ritorna i dati del film ricercato
        renderMovie(data.results);
      },
      "error" : function(err) {
        alert("Errore!");
      },
    }
  );
})


//funzioni utilizzate
function renderMovie(movies) {
  console.log(movies);
  //creo il template
  var source = $("#movie-template").html();
  var template = Handlebars.compile(source);

  //stampo  film ricevuti dalla chiamata api
  for (var i = 0; i < movies.length; i++) {
    var title = movies[i].title;
    var original_title = movies[i].original_title;
    var language = movies[i].original_language;
    var voti = movies[i].vote_average;

    //creo context del template listato movies
    var context = {
      "title": title,
      "original_title": original_title ,
      "language": language,
      "voti": voti
    };

    //preparo html per inserire html
    var html = template(context);
    //vado ad agganciarlo al mio html
    $(".list-movies").append(html);
  }

}
