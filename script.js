// Estimate Installation Price
let submit = document.getElementById("SubmitOption");
let reset = document.getElementById("ResetOption");
let yourPrice = document.getElementById("price-calculated");

reset.onclick = function() {
  document.getElementById("mySelect").selectedIndex = 0;
  document.getElementById("ft_index").value = "";
  document.getElementById("sink_index").value = "";
  yourPrice.innerHTML = "$ ---"
}

submit.onclick = () => {
  
  let type = document.getElementById("mySelect").value;
  let ft = Number(document.getElementById("ft_index").value);
  let sink = Number(document.getElementById("sink_index").value);
  let sink_cost = 150;
  let flat_rate = 100;
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
    let price = ft*multiplier + sink_cost*sink + flat_rate;
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


//Highlight Kitchen button at first 
document.querySelector(".dropdown_selector button:nth-child(1)").style.cssText = "font-weight:bold;";



//Highlight gallery buttons
let dropdown_selector = document.querySelector(".dropdown_selector");
let dropdown_container = document.querySelector(".dropdown_container");
 

dropdown_selector.addEventListener("click", function(event) {
    //Create an array of the byuttons and the image container 
    let img_disp = Array.from(dropdown_container.children);
    let buttons = Array.from(this.children); 
    let index = buttons.indexOf(event.target);
        
    //Highlight the clicked button
    // buttons[index].style.textTransform = "uppercase";
    buttons[index].style.fontWeight = "bold";
    img_disp[index].style.display = "flex"; //Turn on the corresponding image container 

    //remove highlight from the previous
    for(let i = 0; i <= buttons.length - 1; i++ ){
        if( i == index){
            continue;
        }
        buttons[i].removeAttribute('style');
        img_disp[i].style.display = "none";
        
    }
});


//Create a new HTML element
class createElement{   
    constructor(tag,dad,clas,id){
        this.newTag = document.createElement(tag); //type of element
        this.newTag.classList.add(clas); // add class
        document.querySelector(`${dad}`).appendChild(this.newTag); // add new element parent
        if(id){
            this.newTag.id = id; //add an id (not mandatory)
        }
    }
}

//Full screen the images

let image_container = Array.from(dropdown_container.children);

image_container.forEach(child =>{
    child.addEventListener("click", function(event){
       
        //check which image was clicked
        let parent_clicked_index = image_container.indexOf(event.target.closest(".dropdown_images"));
        let image_clicked_index = Array.from(this.children).indexOf(event.target);
        
        if(image_clicked_index >= 0){

            //create new div element 
      let new_div = new createElement("div","body","image_overlay");
      let overlay = new_div.newTag;
      overlay.style.cssText = "position:fixed; top:0; height:100%; width:100%; background-color: rgba(0,0,0,0.75); backdrop-filter: blur(5px); color: white; cursor: pointer; align-content: center; text-align: center; z-index: 100; touch-action: pan-y;";

      let active_index = image_clicked_index;
      let img_tag = image_container[parent_clicked_index].children[active_index].cloneNode(true);
      overlay.appendChild(img_tag);
      img_tag.style.cssText = "max-width: 75vw; min-width: 430px; max-height: 75vh;";
            
            //create "close" text"//
      overlay.appendChild(document.createElement("div")).textContent = "Close";

      let touch_start_x = 0;
      let suppress_click = false;

      const showImage = (index) => {
        let images = image_container[parent_clicked_index].children;
        active_index = (index + images.length) % images.length;
        let next_image = images[active_index].cloneNode(true);
        next_image.style.cssText = "max-width: 75vw; min-width: 430px; max-height: 75vh;";
        overlay.replaceChild(next_image, img_tag);
        img_tag = next_image;
      };

            let touch_start_y = 0;

            overlay.addEventListener("touchstart", (touch_event) => {
                touch_start_x = touch_event.changedTouches[0].clientX;
                touch_start_y = touch_event.changedTouches[0].clientY;
            }, { passive: true });

            overlay.addEventListener("touchend", (touch_event) => {
                let swipe_distance = touch_event.changedTouches[0].clientX - touch_start_x;
                let vertical_distance = touch_event.changedTouches[0].clientY - touch_start_y;
                if(Math.abs(swipe_distance) < 50 || Math.abs(swipe_distance) <= Math.abs(vertical_distance)){
                    return;
                }

                showImage(active_index + (swipe_distance < 0 ? 1 : -1));
                suppress_click = true;
            }, { passive: true });

            overlay.addEventListener("click", () => {
                if(suppress_click){
                    suppress_click = false;
                    return;
                }
                overlay.remove();
            });
        }
    })
})




