// Your code goes here





let root = document.getElementById("root");
root.appendChild(makeMainContent(tanks));


// console.log(root.removeChild(root.firstChild));

// event handler for onhashchange
window.onhashchange = function (eve) {
    console.log("hash is change", window.location.hash);
    if (window.location.hash === "") {
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
        root.appendChild(makeMainContent(tanks));
        return;
    }
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }

    root.appendChild(makeTankDetailsContent(getTankByHash()));
};

// function to select need tank from tanks[] by window.location.hash
function getTankByHash() {
    let tankModel = window.location.hash.slice(1).replace(/_/g, " ");
    return tanks.find(el => {
        return tankModel === el.model;
    });
}



// generate the main page
function makeMainContent(tankList) {
    let retDoc = document.createDocumentFragment();

    let header = document.createElement("h1");
    header.appendChild(document.createTextNode("Most popular tanks"));
    header.classList.add("main-header");

    // create list of thumbnails
    let thumbnailsList = document.createElement("ul");
    thumbnailsList.classList.add("thumbnails-list");
    for (let i = 0; i < tankList.length; ++i) {
        thumbnailsList.appendChild(makeThumbnail(tankList[i]));
    }

    retDoc.appendChild(header);
    retDoc.appendChild(thumbnailsList);
    return retDoc;
}

// function make thumbnail of tank
function makeThumbnail(tank) {
    // create a list item
    let thumbItem = document.createElement("li");
    thumbItem.classList.add("thumbnail-item");
    thumbItem.title = "Click to details";

    // create a link
    let wrapLink = document.createElement("a");
    wrapLink.href = "#" + String(tank.model).replace(/\s/g, "_");

    // create a figure
    let thumbFigure = document.createElement("figure");
    thumbFigure.classList.add("thumbnail-figure");

    // create image
    let thumbImg = document.createElement("img");
    thumbImg.src = tank.preview;

    // create figcaption
    let figcap = document.createElement("figcaption");
    figcap.appendChild(makeFigcaptionContent());
    // figcap.innerHTML = `<img src = "${tank.country_image}"><em>${tank.level}</em><b>` + tank.model.toUpperCase() + "</b>";

    thumbFigure.appendChild(thumbImg);
    thumbFigure.appendChild(figcap);
    wrapLink.appendChild(thumbFigure);
    thumbItem.appendChild(wrapLink);

    return thumbItem;
    // function for inner using
    function makeFigcaptionContent() {
        let retDoc = document.createDocumentFragment();

        // creating elements
        let flagImg = document.createElement("img");
        flagImg.src = tank.country_image;
        flagImg.title = tank.country.toUpperCase();

        let tankLvl = document.createElement("em");
        tankLvl.appendChild(document.createTextNode(tank.level));

        let tankModel = document.createElement("b");
        tankModel.appendChild(document.createTextNode(tank.model.toUpperCase()));
        tankModel.title = tank.model.toUpperCase();

        // adding elements
        retDoc.appendChild(flagImg);
        retDoc.appendChild(tankLvl);
        retDoc.appendChild(tankModel);

        return retDoc;
    }
}



// function making tank detail page
function makeTankDetailsContent(tank) {
    let retDoc = document.createDocumentFragment();

    // header
    retDoc.appendChild(makeHeader());

    // preview
    let previewFig = document.createElement("figure");
    previewFig.classList.add("preview-figure");
    let previewTitle = document.createElement("figcaption");
    previewTitle.appendChild(document.createTextNode("Preview"));
    let previewImg = document.createElement("img");
    previewImg.src = tank.preview;


    // table
    let details = document.createElement("table");
    details.classList.add("details");
    let detailsTitle = document.createElement("caption");
    detailsTitle.appendChild(document.createTextNode("Characteristic"));
    details.appendChild(detailsTitle);

    for(let key in tank.details){
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.appendChild(document.createTextNode(key.replace(/_/g, " ")));
        let td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(tank.details[key]));
        tr.appendChild(td1);
        tr.appendChild(td2);
        details.appendChild(tr);
    }

    // footer
    let backLink = document.createElement("a");
    backLink.href = "#";
    backLink.classList.add("back-link");
    backLink.appendChild(document.createTextNode("Back to list view"));

    previewFig.appendChild(previewTitle);
    previewFig.appendChild(previewImg);

    retDoc.appendChild(previewFig);

    retDoc.appendChild(details);

    let temp = document.createElement("div");
    temp.style.clear = "both";
    retDoc.appendChild(temp);
    retDoc.appendChild(backLink);

    return retDoc;
    // function for inner using
    function makeHeader() {
        let retHeader = document.createElement("h1");
        retHeader.classList.add("tank-details-header");
        // creating elements
        let flagImg = document.createElement("img");
        flagImg.src = tank.country_image;
        flagImg.title = tank.country.toUpperCase();
        // adding elements
        retHeader.appendChild(flagImg);
        retHeader.appendChild(document.createTextNode(" " + tank.model.toUpperCase() + " (level " + tank.level + ")"));
        return retHeader;
    }
}