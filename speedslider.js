function update_speed() {
    var speed = document.getElementById("speedSlider").value/10;
    var videoPlayer = document.getElementsByClassName("video-stream html5-main-video")[0];
    videoPlayer.playbackRate = speed;
    document.getElementById("speedSlider").title = speed.toFixed(1);    
    document.getElementById("valueLabel").innerHTML = speed.toFixed(1);    
}

function reset() {
    var video = document.getElementsByClassName("video-stream html5-main-video")[0];
    video.playbackRate = 1;
    document.getElementById("speedSlider").value = 10;
    document.getElementById("speedSlider").title = 1.0.toFixed(1);
    document.getElementById("valueLabel").innerHTML = 1.0.toFixed(1);    
}

function inject() {

    var check_slid = document.getElementById('speedSlider');
    var check_butn = document.getElementById('resetButton');
    var check_labl = document.getElementById('valueLabel');
    if (check_slid != null && check_butn != null && check_labl != null){
        check_slid.remove();
        check_butn.remove();
        check_labl.remove();
    }

    
    var ytpcon = document.getElementsByClassName("ytp-chrome-controls")[0];

    var style = document.createElement("style");
    document.head.appendChild(style);

    var grid = document.createElement("div");

    grid.classList.add("injected_grid"); 

    var label = document.createElement('label');
    label.id = "valueLabel";
    label.innerHTML = "1.0"

    var button = document.createElement('button');
    button.type = "button";
    button.id = "resetButton";
    button.title = "reset";
    button.innerHTML = "R";

    var slider = document.createElement('input');
    slider.type = "range";
    slider.min = "1";
    slider.max = "40";
    slider.value = "10";
    slider.classList.add("slider");
    slider.id = "speedSlider";
    slider.title = "1";

    grid.appendChild(button);
    grid.appendChild(slider);
    grid.appendChild(label);
    ytpcon.insertBefore(grid, document.getElementsByClassName("ytp-right-controls")[0]);

    style.sheet.insertRule(
        `.injected_grid {
            display: grid;

            align-items: center;
            grid-template-rows: auto;
            grid-template-columns: auto auto auto;
            grid-template-areas: "resetbtn slider label";

        }`);

    style.sheet.insertRule(
        `#resetButton {
            grid-area: resetbtn;
        }`);

    style.sheet.insertRule(
        `#valueLabel {
            grid-area: label
        }`);

    style.sheet.insertRule(
        `#speedSlider {
            grid-area: slider

            vertical-align: middle; 
            -moz-appearance: none;
            appearance: none;

            outline: none;
            border: none;
            box-shadow: none;
            border-radius: 3px;

            height: 0.5em;
            background: grey;
            transition: background 0.1s ease-in;
            transition: background 1s ease-out;
        }`);
            
    style.sheet.insertRule(
        `#speedSlider::-moz-range-thumb {
            background: lightgrey;
            border: none;

            cursor: pointer;
            height; 5px;
            width: height;
            transition: background .1s ease-in-out;
        }`);
        
     style.sheet.insertRule(
        `#speedSlider::-moz-range-progress {
            background: goldenrod;
            height: 100%;                    
            transition: background 1s ease-in;
            transition: background 0.1s ease-out;
        }`);


    //style.sheet.insertRule('#resetButton {margin-top: 10px;}');
    /*
    ytpcon.insertBefore(button, document.getElementsByClassName("ytp-right-controls")[0]);
    ytpcon.insertBefore(slider, document.getElementsByClassName("ytp-right-controls")[0]);
    ytpcon.insertBefore(label, document.getElementsByClassName("ytp-right-controls")[0]);
    */

}

function add_listeners(){
    document.getElementById("speedSlider").addEventListener("input", update_speed);
    document.getElementById("resetButton").addEventListener("click", reset);
}

/*
function save_speed(){
    var video = document.URL.split("/")[3];
    var channle = document.getElementsByClassName('yt-simple-endpoint style-scope yt-formatted-string')[0].textContent;

    browser.storage.local.set({
        speed: document.getElementById("speedSlider").value
      });
}
*/

function load_speed(){

    var speed = 1;
    var video = document.URL.split("/")[3];
    var channle = document.getElementsByClassName('yt-simple-endpoint style-scope yt-formatted-string')[0].textContent;

    function setSpeed(result) {
        speed = result.speed | speed;
    }
    
    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let get_global_speed = browser.storage.local.get(global);
    get_global_speed.then(setSpeed, onError);
    
    let get_channel_speed = browser.storage.local.get(channle);
    get_channel_speed.then(setSpeed, onError);

    let get_video_speed = browser.storage.local.get(video);
    get_video_speed.then(setSpeed, onError);

    document.getElementById("speedSlider").value = speed*10;
    document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = speed;
    document.getElementById("speedSlider").title = speed.toFixed(1);    
    document.getElementById("valueLabel").innerHTML = speed.toFixed(1); 

}

function init() {
    inject();
    add_listeners();
    load_speed();
}


init();





