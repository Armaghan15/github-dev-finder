document.querySelector(".button-container").addEventListener("click", () => {
  let text = document.getElementById("filter-jobs").value;
  getDevs().then(devs => {
    let filteredDevs = filterDevs(devs, text);
    showDevs(filteredDevs)
  })
  console.log(text);
})



const getDevs = () => {

  url = "https://api.github.com/users"

  return fetch(url).then(response => response.json()).then(data => {
    return data;
  })
}


const filterDevs = (devs, searchText) => {
  if (searchText) {
    let filtereddevs = devs.filter(dev => {
      if (dev.login.toLowerCase().includes(searchText))  {
        return true;
      } else {
        return false;
      }
    })
    return filtereddevs;
  } else {
    return devs;
  }
}


const showDevs = (devs) => {
  console.log("devs in showDevs", devs);

  let devsContainer = document.querySelector(".jobs-container");
  
  let devsHTML = "";

  let devAmount = document.querySelector(".dev-amount");
  
  devs.forEach((dev) => {
    devsHTML += 
    `<div class="job-tile">
      <div class="top">
        <img src="${dev.avatar_url}"
          alt="">
        <span class="material-icons more-horiz">more_horiz</span>
      </div>

      <div class="rolename">
        <span>${dev.login}</span>
      </div>
      <div class="buttons">

        <div class="button apply-now">
            <a target=_blank href=${dev.html_url}>View Profile</a>
        </div>
      
        <div class="button">
          Message
        </div>
      </div>

    </div>
  `
  })

  devAmount.innerHTML = `Showing ${devs.length} Devs`

  devsContainer.innerHTML = devsHTML;
}



getDevs().then(data => {
  showDevs(data)
})