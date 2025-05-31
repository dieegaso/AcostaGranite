

// Estimate Installation Price
let submit = document.getElementById("SubmitOption");
let reset = document.getElementById("ResetOption");
let yourPrice = document.getElementById("price-calculated");



reset.onclick = function() {
  
  document.getElementById("mySelect").selectedIndex = 0;
  document.getElementById("ft2").value = "";
  yourPrice.innerHTML = "$ ---"
}

submit.onclick = () => {
  
  let type = document.getElementById("mySelect").value;
  let ft = Number(document.getElementById("ft2").value);
  yourPrice.innerHTML = "test"
  
  if(ft > 0){
    switch(type){
      case "Granite":
        multiplier = 25.14;
        break;
      case "Quarts":
        multiplier = 32.26;
        break;
      case "Leather":
        multiplier = 39.32;
        break;
      case "Marble":
        multiplier = 45.27;
        break;
    }    
    let price = ft*multiplier + 100;
    yourPrice.innerHTML = "$ " + price.toLocaleString("en-US");
    let container = document.getElementById("body");
    let overlay = document.createElement("div");
    overlay.innerHTML = `
      <div id="estimate-price-overlay">
        <div id="ov" style="background-color: white; padding:1rem; text-align: center; border-radius: 20px">
          <div> Estimated price is:</div>
          <div id="overlay_price" >$ ${price.toLocaleString("en-US")}</div>  
          <button id="close">Close</button>
        </div>
      </div>
    `;
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.25);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `;

    container.appendChild(overlay);
    if(overlay){
      document.getElementById("close").onclick = ()=> overlay.remove();
    }

  }
  else{
    yourPrice.innerHTML = "Invalid Data";
  }

}



