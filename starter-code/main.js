// A $( document ).ready() block.
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var lightmode = 1;

function checknull(p1) {
  var p2 = "Not available"
  if (!(p1 === null)){
    p2 = p1;
  } 
  return p2;
}

function dataretrival(p1) {
  $.get("https://api.github.com/users/" + p1, function(data, status){
    $("#login").html(data.login);
    $("#name").html(data.name);
    var bio2 = "This profile has no bio"
    if (!(data.bio === null)){
      bio2 = data.bio;
    } 
    $("#bio").html(bio2);
    var date = new Date(data.created_at);

    $("#joined_at").html("Joined " + date.getDay().toString() + " " + monthNames[date.getMonth()] + " " + date.getFullYear().toString() );
    $("#reposnumber").html(data.public_repos);
    $("#folowersnumber").html(data.followers);
    $("#folowingnumber").html(data.following);
    $("#location_link").html(checknull(data.location));
    $("#website_link").html(checknull(data.blog));
    $("#twitter_link").html(checknull(data.twitter_username));
    $("#company_link").html(data.company);
    $("#user_image").attr("src", data.avatar_url);
  }).fail(function(){
    alert("No user found for input " + p1);
  });
}


$( document ).ready(function() { 
  dataretrival("octocat");
  
  $("#search_button").click(function(){
    dataretrival($("#search_input").val())
  }); 

  $("#change_mode").click(function(){
    if (lightmode == 1){
      lightmode = 0;
      $.each($(".lightmode"), function(index, value){
        $(this).removeClass("lightmode");
        $(this).addClass("darkmode");
        $("#mode_text").html("Light");
        $("#mode_icon").attr("src", "./assets/icon-sun.svg");

        $("#change_mode").removeClass("darkmodefont");
        $("#change_mode").addClass("lightmodefont");
      });
    } 
    else{
      lightmode = 1;
      $.each($(".darkmode"), function(index, value){
        $(this).removeClass("darkmode");
        $(this).addClass("lightmode");
        $("#mode_text").html("Dark");
        $("#mode_icon").attr("src", "./assets/icon-moon.svg");
        $("#change_mode").removeClass("lightmodefont");
        $("#change_mode").addClass("darkmodefont");
      });
    }
  }); 
});

