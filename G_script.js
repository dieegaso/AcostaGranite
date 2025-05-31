//Highlight Kitchen button at first 
document.querySelector(".dropdown_selector button:nth-child(1)").style.cssText = "background-color: rgba(0,0,0,0.15); box-shadow: inset 0px 5px 15px -10px;";



//Highlight gallery buttons
let dropdown_selector = document.querySelector(".dropdown_selector");
let dropdown_container = document.querySelector(".dropdown_container");
 

dropdown_selector.addEventListener("click", function(event) {
    //Create an array of the byuttons and teh image container 
    let img_disp = Array.from(dropdown_container.children);
    let buttons = Array.from(this.children); 
    let index = buttons.indexOf(event.target);
        
    //Highlight the clicked button
    buttons[index].style.backgroundColor = "rgba(0, 0, 0, 0.15)";
    buttons[index].style.boxShadow = "inset 0px 5px 15px -10px";
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
            new_div = new createElement("div","body","image_overlay");
            new_div.newTag.style.cssText = "position:fixed; top:0; height:100%; width:100%; background-color: rgba(0,0,0,0.75); backdrop-filter: blur(5px); color: white; cursor: pointer; align-content: center; text-align: center; z-inder: 100;";

 
            //create image tag and add styles
            let img_tag = image_container[parent_clicked_index ].children[image_clicked_index].cloneNode(true);
            document.querySelector(".image_overlay").appendChild(img_tag);
            img_tag.style.cssText = "max-width: 75vw; min-width: 430px; max-height: 75vh;";
            
            //create "close" text"//
            document.querySelector(".image_overlay").appendChild(document.createElement("div")).textContent = "Close";

                
            document.querySelector(".image_overlay").addEventListener("click", () => { 
                document.querySelector(".image_overlay").remove();
            })
        }
    })
})



