// Your code goes here
let root = document.getElementById("root");

// for good first start and for reload page on tank-details page
if (window.location.hash === "" || window.location.hash === "#main") {
    window.location.hash = "#main";
    root.appendChild(makeMainContent(tanks));
}
else {
    root.appendChild(makeTankDetailsContent(getTankByHash()));
}

// function for delete all children
function removeAllChildren(elem) {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}

// event handler for onhashchange
window.onhashchange = function (eve) {
    // remove all children from root element
    removeAllChildren(root);
    // if main page
    if (window.location.hash === "#main") {
        root.appendChild(makeMainContent(tanks));
        return;
    }
    // if tank details pages
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
    thumbItem.addEventListener("click", function (eve) {
        window.location.hash = tank.model.replace(/\s/g, "_");
    });

    // create an inner elements for list item
    let thumbFigure = document.createElement("figure");

    let thumbImg = document.createElement("img");
    thumbImg.src = tank.preview;

    let thumbFigcap = document.createElement("figcaption");

    // adding all inner elements to thumbFigure and thumbItem
    thumbFigcap.appendChild(makeFigcaptionContent());
    thumbFigure.appendChild(thumbImg);
    thumbFigure.appendChild(thumbFigcap);
    thumbItem.appendChild(thumbFigure);

    return thumbItem;

    // function for inner using to separate creating of figcaption for thumbFigure from other actions
    function makeFigcaptionContent() {
        let retDoc = document.createDocumentFragment();

        // creating inner elements for figcaption
        let flagImg = document.createElement("img");
        flagImg.src = tank.country_image;
        flagImg.title = tank.country.toUpperCase();

        let tankLvl = document.createElement("em");
        tankLvl.appendChild(document.createTextNode(tank.level));

        let tankModel = document.createElement("b");
        tankModel.appendChild(document.createTextNode(tank.model.toUpperCase()));
        tankModel.title = tank.model.toUpperCase();

        // adding inner elements
        retDoc.appendChild(flagImg);
        retDoc.appendChild(tankLvl);
        retDoc.appendChild(tankModel);

        return retDoc;
    }
}



// function making tank detail page
function makeTankDetailsContent(tank) {
    let retDoc = document.createDocumentFragment();

    // creating and appending header of tank details page
    retDoc.appendChild(makeHeader());

    // creating preview of tank
    let previewFig = document.createElement("figure");
    previewFig.classList.add("preview-figure");

    let previewTitle = document.createElement("figcaption");
    previewTitle.appendChild(document.createTextNode("Preview"));
    previewFig.appendChild(previewTitle);

    let previewImg = document.createElement("img");
    previewImg.src = tank.preview;
    previewFig.appendChild(previewImg);

    // creating the table with details of tank
    let details = document.createElement("table");
    details.classList.add("details");
    let detailsTitle = document.createElement("caption");
    detailsTitle.appendChild(document.createTextNode("Characteristic"));
    details.appendChild(detailsTitle);

    for (let key in tank.details) {
        let trItem = makeTableRowItem(key, tank.details[key]);
        details.appendChild(trItem);
    }

    // creating the backlink
    let backLink = document.createElement("a");
    backLink.href = "#main";
    backLink.classList.add("back-link");
    backLink.appendChild(document.createTextNode("Back to list view"));

    retDoc.appendChild(previewFig);
    retDoc.appendChild(details);
    retDoc.appendChild(backLink);

    return retDoc;
    // function for inner using to separate code
    // create the header for tank details page
    function makeHeader() {
        let retHeader = document.createElement("h1");
        retHeader.classList.add("tank-details-header");
        // creating inner elements of header
        let flagImg = document.createElement("img");
        flagImg.src = tank.country_image;
        flagImg.title = tank.country.toUpperCase();
        // adding elements
        retHeader.appendChild(flagImg);
        retHeader.appendChild(document.createTextNode(" " + tank.model.toUpperCase() + " (level " + tank.level + ")"));
        return retHeader;
    }

    // function for inner using to separate code of creating <tr> element
    function makeTableRowItem(charType, charValue) {
        let retTRItem = document.createElement("tr");
        let characteristicType = document.createElement("td");
        characteristicType.appendChild(document.createTextNode(charType));
        let characteristicValue = document.createElement("td");
        characteristicValue.appendChild(document.createTextNode(charValue));
        retTRItem.appendChild(characteristicType);
        retTRItem.appendChild(characteristicValue);
        return retTRItem;
    }
}