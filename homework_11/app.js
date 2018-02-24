var rootNode = document.getElementById("root");

// Your code goes here


let view = document.createElement("ul");
view.className = "noIcons";


makeHTMLView(structure, view);
let mouseClickObj = document.createElement("li");
mouseClickObj.className = "mouseReaction notshow";



function makeHTMLView(structure, node) {
    // if structure has no elements (child)
    if (structure === false || structure === null) {
        node.appendChild(createStNode("empty"));
        return;
    }

    // if structure has elements (children)
    for (let i = 0; i < structure.length; ++i) {
        // if folder
        if (structure[i].folder === true) {
            node.appendChild(createStNode("folder", structure[i].title));
            makeHTMLView(structure[i].children, node.childNodes[i].childNodes[1]);
        }
        // if file
        if (structure[i].folder === undefined) {
            node.appendChild(createStNode("file", structure[i].title));
        }
    }
    return;
}



// create empty node
function createEmptyNode(msg = "Folder is empty") {
    let retNode = document.createElement("li");
    retNode.className = "empty";
    retNode.appendChild(document.createTextNode(msg));
    return retNode;
}

// create file node
function createFileNode(fileName) {
    let retNode = document.createElement("li");
    retNode.className = "head-wrapper";

    retNode.appendChild(createIconNode("description"));
    retNode.appendChild(document.createElement("span"));
    retNode.childNodes[1].appendChild(document.createTextNode(fileName));
    return retNode;
}

// create folder node
function createFolderNode(folderName) {
    // main element
    let retNode = document.createElement("li");
    // retNode.className = "folder";
    // header element
    let wrapNode = document.createElement("div");
    wrapNode.className = "head-wrapper";
    wrapNode.appendChild(createIconNode("folder"));
    wrapNode.appendChild(document.createElement("span"));
    wrapNode.childNodes[1].appendChild(document.createTextNode(folderName));
    wrapNode.addEventListener("click", (eve) => {
        let list = eve.currentTarget.nextElementSibling;
        eve.currentTarget.firstElementChild.innerHTML = (list.classList.contains("closed")) ? "folder_open" : "folder";
        list.classList.toggle("opened");
        list.classList.toggle("closed");
    }, false);



    wrapNode.addEventListener("mousemove", function(eve){
        mouseClickObj.style.top = `calc(${eve.clientY}px - 1rem)`;
        mouseClickObj.style.left = `calc(${eve.clientX}px - 1rem)`;
    });
    
    wrapNode.addEventListener("mousedown", function(eve){

        wrapNode.appendChild(mouseClickObj);

        mouseClickObj.style.top = `calc(${eve.clientY}px - 1rem)`;
        mouseClickObj.style.left = `calc(${eve.clientX}px - 1rem)`;
        mouseClickObj.classList.toggle("show");
        mouseClickObj.classList.toggle("notshow");
    });
    
    wrapNode.addEventListener("mouseup", function(eve){
        mouseClickObj.remove();
        mouseClickObj.classList.toggle("show");
        mouseClickObj.classList.toggle("notshow");
    });


    retNode.appendChild(wrapNode);
    // children container element (<ul>...</ul>)
    let ulNode = document.createElement("ul");
    ulNode.className = "noIcons closed";
    retNode.appendChild(ulNode);
    return retNode;
}

// create the node with icon of different types
function createIconNode(type) {
    let tempNode = document.createElement("i");
    tempNode.className = "material-icons";
    tempNode.appendChild(document.createTextNode(type));
    return tempNode;
}

// create node
function createStNode(type, title) {
    if (String(type).toLowerCase() === "empty") {
        return createEmptyNode(title);
    }
    if (String(type).toLowerCase() === "file") {
        return createFileNode(title);
    }
    if (String(type).toLowerCase() === "folder") {
        return createFolderNode(title);
    }
    return null;
}



rootNode.appendChild(view);



// debugger;



// rootNode.appendChild(/* Append your TreeView node*/);
