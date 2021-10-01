
function save_speed(button) {
    button.target.id
}

function hide_all() {
    var grids = document.getElementsByClassName("grid");
    for (let index = 0; index < grids.length; index++) {
        grids[index].style.display = "none";   
    }
}

/* TODO: switch statement?*/
function show_help() {
    hide_all();
    document.getElementById("help_grid").style.display = "grid";
    
}

function back_to_main() {
    hide_all();
    document.getElementById("main_grid").style.display = "grid";
}

function manage_storage() {
    hide_all();
    document.getElementById("storage_grid").style.display = "grid";
}

function switch_storage_view() {
    var elm = document.getElementById("switch_storage_view");
    if (elm.innerText == "videos") {
        elm.innerText = "channels";
        document.getElementById("videos").style.display = "grid";
        document.getElementById("channels").style.display = "none";
    } else {
        elm.innerText = "videos";
        document.getElementById("videos").style.display = "none";
        document.getElementById("channels").style.display = "grid";
    };
}

function add_listeners() {
    document.getElementById("save_default").addEventListener("click", save_speed);
    document.getElementById("save_channel").addEventListener("click", save_speed);
    document.getElementById("save_video").addEventListener("click", save_speed);
    document.getElementById("show_help").addEventListener("click", show_help);
    document.getElementById("manage_storage").addEventListener("click", manage_storage);
    document.getElementById("switch_storage_view").addEventListener("click", switch_storage_view);
    document.getElementById("storage_back").addEventListener("click", back_to_main);
    document.getElementById("help_back").addEventListener("click", back_to_main);
}
/* Message test */

document.getElementById("save_default").addEventListener("click", (e) => {
    var query = browser.tabs.query({currentWindow: true, active : true});
    var tab = query.then(getTab,onError);

    function getTab(tabs) {
        for (let tab of tabs){
            send(tab.id);
        }
    }

    function onError(error) {
      console.log(`Error: ${error}`);
    }

    function send(tab){
        browser.tabs.sendMessage(tab, {record: "start"});
    }
});





/* Initilize the script */

function init() {

    /* disable menu buttons if not on an compatible page */
    browser.tabs.query({currentWindow: true, active: true})
        .then((tabs) => {
        if (tabs[0].url.split("/")[2] != "www.youtube.com") {
            document.getElementById("save_default").disabled = false;
            document.getElementById("save_channel").disabled = false;
            document.getElementById("save_video").disabled = false;

            document.getElementById("save_default").title = "Page not supported";
            document.getElementById("save_channel").title = "Page not supported";
            document.getElementById("save_video").title = "Page not supported";                
        };
    })

    add_listeners();
}

init();