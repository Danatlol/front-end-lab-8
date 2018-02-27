var rootNode = document.getElementById("root");


let view = makeHTMLView(structure, document.createElement("ul"));
view.className = "noIcons";

// create object for mouse reaction
let mouseClickObj = document.createElement("div");
mouseClickObj.className = "mouseReaction notshow";

function makeHTMLView(structure, node) {
    // if structure has no elements (child)
    if (structure === false || structure === null) {
        node.appendChild(createNodeEx("empty"));
        return node;
    }

    // if structure has elements (children)
    for (let i = 0; i < structure.length; ++i) {
        // if folder
        if (structure[i].folder === true) {
            node.appendChild(createNodeEx("folder", structure[i].title));
            makeHTMLView(structure[i].children, node.childNodes[i].childNodes[1]);
        }
        // if file
        if (structure[i].folder === undefined) {
            node.appendChild(createNodeEx("file", structure[i].title));
        }
    }
    return node;
}

// create node extended
function createNodeEx(type, title) {
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

// create empty node
function createEmptyNode() {
    let retNode = document.createElement("li");
    retNode.appendChild(createTitleNode());
    return retNode;
}

// create file node
function createFileNode(fileName) {
    let retNode = document.createElement("li");
    retNode.appendChild(createTitleNode(fileName, "file", "description"));
    return retNode;
}

// create folder node
function createFolderNode(folderName) {
    let retNode = document.createElement("li");
    retNode.appendChild(createTitleNode(folderName, "folder", "folder"));

    // children container element for folder's items (<ul>...</ul>)
    let ulNode = document.createElement("ul");
    ulNode.classList.add("noIcons", "closed");
    retNode.appendChild(ulNode);
    return retNode;
}

// create the header node of different types
function createTitleNode(title = "Folder is empty", type = "empty", icon = "") {
    let retNode = document.createElement("div");
    retNode.classList.add("head-wrapper");

    // add event handler for circle mouse reaction (for all type of elements)
    retNode.addEventListener("mouseenter", function () {
        retNode.appendChild(mouseClickObj);
    });

    // throttling mousemove event
    retNode.addEventListener("mousemove", throttle(function (eve) {
        mouseClickObj.style.top = `calc(${eve.clientY}px - 0.95rem)`;
        mouseClickObj.style.left = `calc(${eve.clientX}px - 0.95rem)`;
    }, 50));

    retNode.addEventListener("mousedown", function (eve) {
        mouseClickObj.classList.add("show");
        mouseClickObj.classList.remove("notshow");
    });

    retNode.addEventListener("mouseup", function (eve) {
        mouseClickObj.classList.add("notshow");
        mouseClickObj.classList.remove("show");
    });

    // if type is empty the node is ready
    if (type === "empty") {
        retNode.innerHTML = `<i>${title}</i>`;
        return retNode;
    }

    retNode.appendChild(createIconNode(icon));
    retNode.appendChild(document.createElement("span"));
    retNode.children[1].appendChild(document.createTextNode(title));

    // if type is file the node is ready
    if (type === "file") {
        return retNode;
    }

    // add event handler for closing/opening folders
    retNode.addEventListener("click", (eve) => {
        let list = eve.currentTarget.nextElementSibling;
        eve.currentTarget.firstElementChild.innerHTML = (list.classList.contains("closed")) ? "folder_open" : "folder";
        list.classList.toggle("opened");
        list.classList.toggle("closed");
    });

    return retNode;
}

// create the node with icon of different types
function createIconNode(icon) {
    let tempNode = document.createElement("i");
    tempNode.className = "material-icons";
    tempNode.appendChild(document.createTextNode(icon));
    return tempNode;
}

// throttling function for mousemove event
function throttle(action, interval) {
    let canUse = true;
    return function () {
        if (canUse) {
            action(...arguments);
            canUse = false;
            setTimeout(() => { canUse = true; }, interval);
        }
    };
}

rootNode.appendChild(view);