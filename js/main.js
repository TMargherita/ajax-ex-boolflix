$(document).ready(function() {

  var searchMovie="Ritorno al futuro";

  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/movie",
      "data": {
        "api_key": "8daa01d92ef3f575dadf0aab8dfe1e77",
        "query": searchMovie,
        "language": "it-IT"
      },
      "method": "GET",
      "success": function(data) {
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
}
