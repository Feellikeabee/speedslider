function inject() {
    console.log("injecting controls");

    var check_injected = document.getElementById('injected_grid');
    if (check_injected != null){
        console.log("removing existing injection");
        check_injected.innerHTML = "";
        check_injected.remove();
    }

    
    var ytpcon = document.getElementsByClassName("ytp-chrome-controls")[0];

    var style = document.createElement("style");
    document.head.appendChild(style);

    var grid = document.createElement("div");
    grid.id = "injected_grid";
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
    console.log("adding listeners");
    document.getElementById("speedSlider").addEventListener("input", update_speed);
    document.getElementById("resetButton").addEventListener("click", reset);
}

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


/*
function save_speed(){
    var video = document.URL.split("/")[3];
    var channle = document.getElementsByClassName('yt-simple-endpoint style-scope yt-formatted-string')[0].textContent;

    browser.storage.local.set({
        speed: document.getElementById("speedSlider").value
      });
}
*/

function save_speed(key) {


}

function load_speed(){
    console.log("loading speeds");

    function onGot(item) {

        var video = document.URL.split("/")[3];
        var channle = document.getElementsByClassName('yt-simple-endpoint style-scope yt-formatted-string')[0].textContent;
        var speed;

        if (item.hasOwnProperty(video)) {
            speed = item[video].speed;

        } else if (item.hasOwnProperty(channle)) {
            speed = item[channle].speed;

        } else if (item.hasOwnProperty("default")) {
            console.log("duh");
            speed = item["default"].speed;

        } else {
            speed = 1;
        }

        document.getElementById("speedSlider").value = speed*10;
        document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = speed;
        document.getElementById("speedSlider").title = speed.toFixed(1);    
        document.getElementById("valueLabel").innerHTML = speed.toFixed(1); 
    }
    
    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getspeeds = browser.storage.local.get();
    getspeeds.then(onGot, onError);
}

function load_settings() {
    function onGot(item) {
        if (item.hasOwnProperty("settings")) {

            console.log("ok wat")

        }
    }
    
    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let aaaa = browser.storage.local.get();
    aaaa.then(onGot, onError);
}
/* Message test */

(function() {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    browser.runtime.onMessage.addListener(notify);
    function notify(message){
        alert(message.record);
    }
})();

/* Initilize the script */

function init() {
    console.log("starting up");
    //load_settings();
    inject();
    add_listeners();
    load_speed();
}


function onCleared() {
    console.log("clearing storage");
    console.log("OK");

}
  
function onError(e) {
    console.log(e);
}
  
var clearStorage = browser.storage.local.clear();
clearStorage.then(onCleared, onError);

    
init();

