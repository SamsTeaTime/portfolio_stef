$(document).ready(function(){
  function format_date(date) {
    return new Date(date.indexOf('-') !== -1 ? date : date * 1000);
  };

  // declare variables
  var project = [];
  var projectArray = [];
  loaded_APIs = null;

  var username_github   = "PirateStef";
  var url_github        = 'https://api.github.com/users/'+username_github+'/repos?sort=created';

  var key_behance       = "pqHdFenZkwPguo3z5T3o2LicYBAHdahy";
  var username_behance  = "stefkors";
  var url_behance       = 'https://www.behance.net/v2/users/'+ username_behance +'/projects?callback=?&api_key='+ key_behance;

  //https://www.behance.net/v2/users/stefkors/projects?callback=?&api_key=pqHdFenZkwPguo3z5T3o2LicYBAHdahy

  var key_dribbble      = "0c4fd8433dfcb88806d6f82ebb7227422749aa2021a5c19df1d5c0bed6f5f304";
  var username_dribbble = "PirateStef";
  var url_dribbble      = "https://api.dribbble.com/v1/users/" + username_dribbble + "/shots?per_page=2600&access_token=" + key_dribbble;

  // https://api.dribbble.com/v1/users/PirateStef/shots?access_token=0c4fd8433dfcb88806d6f82ebb7227422749aa2021a5c19df1d5c0bed6f5f304

  GET_obj();

  function GET_obj() {
    $.getJSON(url_github, function(json){
      object = json;
      api = "github";
      load_objects();
    });
    $.getJSON(url_behance, function(json){
      object = json.projects;
      api = "behance";
      load_objects();
    });
    $.getJSON(url_dribbble, function(json){
      object = json;
      api = "dribbble";
      load_objects();
    });
  };
  function load_objects() {
      var name = null;
      var description = null;
      var date = null;
      var url = null;
      var language = null;
      var image = null;
      $.each(object, function(index) {
        switch (api) {
          case "github":
            name          = object[index].name;
            date          = object[index].updated_at;
            description   = object[index].description;
            url           = object[index].html_url;
            language      = object[index].language;
            break;
          case "behance":
            name          = object[index].name;
            date          = object[index].published_on.toString();
            description;
            url           = object[index].url;
            image         = object[index].covers.original;
            break;
          case "dribbble":
            name          = object[index].title;
            date          = object[index].created_at;
            description   = object[index].description;
            url           = object[index].html_url;
            image         = object[index].images.normal; /** for hd use: hidpi **/
            break;
          default:
        }
        date = format_date(date);
        projectArray.push([date, name, description, url, image, language]);
      });
      loaded_APIs++
      if (loaded_APIs == 3) {
        load_HTML();
        bgColor();

      }
  };
  function load_HTML() {
    projectArray.sort(function(a,b) {
      return b[0] - a[0];
    });
    for (var i = 0; i < projectArray.length; i++) {
      name          = "<span class='name'>" + projectArray[i][1] + "</span>";
      description   = "<p class='description'>" + projectArray[i][2] + "</p>";
      url           = projectArray[i][3];
      image         = projectArray[i][4];

      if (projectArray[i][4] !== null) {
        // image         = "<div class='photo'><img src=" + image + " alt='' /></div>";
        // Not the right way, but it works for now
        image         = "<div class='photo' style='background-image: url(" + image + ");'></div>";
      } else {
        image = "<div class='photo'></div";
      };
      completeProject       = "<a class='url project'  target='_blank' href='" + url + "'>" + name  + image +  "</a>";
      $(".api").append(completeProject);
    }
  };
  function bgColor() {
  $(".photo").each(function() {
    var red   = (Math.round(Math.random()* 127) + 127);
    var green   = (Math.round(Math.random()* 127) + 127);
    var blue  = (Math.round(Math.random()* 127) + 127);
    // var color  = '#' + red + green + blue;
    var color   = 'rgba(' + red + ',' + green + ',' + blue + ', 0.9)';
    $(this).css("background-color", color);
    $(this).find(".language").css("color", color);

  });
};
});