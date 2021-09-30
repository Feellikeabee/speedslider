
function save_default() {
    console.log("save_default");
}

function save_channel() {
    console.log("save_channel");
}

function save_video() {
    console.log("save_video");
}

function hide_all() {
    var grids = document.getElementsByClassName("grid");
    for (let index = 0; index < grids.length; index++) {
        grids[index].style.display = "none";   
    }
}

function show_help() {
    hide_all();
    document.getElementById("help_grid").style.display = "grid";
    
}

function go_back() {
    hide_all();
    document.getElementById("main_grid").style.display = "grid";
}

function manage_storage() {
    hide_all();
    document.getElementById("storage_grid").style.display = "grid";
}

function switch_view() {
    var elm = document.getElementById("switch_view");
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
    document.getElementById("save_default").addEventListener("click", save_default);
    document.getElementById("save_channel").addEventListener("click", save_channel);
    document.getElementById("save_video").addEventListener("click", save_video);
    document.getElementById("show_help").addEventListener("click", show_help);
    document.getElementById("manage_storage").addEventListener("click", manage_storage);
    document.getElementById("switch_view").addEventListener("click", switch_view);
    document.getElementById("storage_back").addEventListener("click", go_back);
    document.getElementById("help_back").addEventListener("click", go_back);
}

function main() {
    function getPage(){
        browser.tabs.query({currentWindow: true, active: true})
          .then((tabs) => {
            if (tabs[0].url.split("/")[2] != "www.youtube.com") {
                document.getElementById("save_default").disabled = true;
                document.getElementById("save_channel").disabled = true;
                document.getElementById("save_video").disabled = true;

                document.getElementById("save_default").title = "Not supported on this page";
                document.getElementById("save_channel").title = "Not supported on this page";
                document.getElementById("save_video").title = "Not supported on this page";                
            };
        })
    }
    
    getPage();
    add_listeners();
}
main();