document.addEventListener("DOMContentLoaded", function() {

  fetcherAPI("alisaitbilgi");

  document.querySelector(".search-inp").addEventListener("change", function(e) {
    fetcherAPI(e.target.value);
  });

});

function fetcherAPI(userName) {
  const url = "https://api.github.com/users/" + userName;
  const fields = [
    {name: "name", fallback: "No User Found"},
    {name: "public_repos", fallback: 0},
    {name: "following", fallback: 0},
    {name:  "followers", fallback: 0},
    {name: "public_gists", fallback: 0},
    {name: "company", fallback: "No Company Defined"}
  ];

  fetch(url)
    .then(function (response) {
      if (response.status === 200) {
        response.json()
          .then(function (result) {
            document.querySelector(".avatar_url").src = result["avatar_url"];
            fields.forEach(function (each) {
              viewUpdater(each.name, result[each.name] ||each.fallback);
            });
          })
          .catch(function (err) {
            console.log("Failed to parse Json Data: ", err);
          })
      } else if (response.status === 404) {
        document.querySelector(".avatar_url").src = "./img/download.png";
        fields.forEach(function (each) {
          viewUpdater(each.name, each.fallback);
        });
        console.error("User: " + userName + " Not Found: ", response.status);
      } else if (response.status === 403) {
        alert("You have reached the daily request limit");
      } else {
        console.error("Response Status: ", response.status);
      }
    })
    .catch(function (err) {
      console.log(err);
    })
}

function viewUpdater(name, updatedText) {
  document.querySelector("." + name).innerText = updatedText;
}
