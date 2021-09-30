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

    var css = document.createElement("link");
    css.href = "speedslider.css";
    css.type = "text/css";
    css.rel = "stylesheet";

    var style = document.createElement("style");
    document.head.appendChild(style);
    
    var ytpcon = document.getElementsByClassName("ytp-chrome-controls")[0];
    
    var slider = document.createElement('div');
    slider.innerHTML = '<input type="range" min="1" max="40" value="10" class="slider" id="speedSlider" title=""></input>';
    /*
    style.sheet.insertRule(
        `#speedSlider {
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
        `#speedSlider:hover #speedSlider::-moz-range-progress {
            background: goldenrod;                    
            transition: background 1s ease-in;
            transition: background 0.1s ease-out;
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
        `#speedSlider::-moz-range-progress:hover {
            background-color: #43e5f7;
        }`); 

    */
    
    var label = document.createElement('div');
    label.innerHTML = '<label id="valueLabel"/>';
    
    var button = document.createElement('div');
    button.innerHTML = ' <button type="button" id="resetButton" title="reset">R</button>';
    //style.sheet.insertRule('#resetButton {margin-top: 10px;}');
    
    ytpcon.insertBefore(button, document.getElementsByClassName("ytp-right-controls")[0]);
    ytpcon.insertBefore(slider, document.getElementsByClassName("ytp-right-controls")[0]);
    ytpcon.insertBefore(label, document.getElementsByClassName("ytp-right-controls")[0]);
    document.getElementById("speedSlider").title = document.getElementById("speedSlider").value/10;    

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





