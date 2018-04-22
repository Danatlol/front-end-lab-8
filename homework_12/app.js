const model = {
    currentPerson: {},
    allPersons: [
        {
            name: 'Lily Butler',
            score: 2,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/1.jpg'
        }, {
            name: 'Waller Perry',
            score: 4,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/women/1.jpg'
        }, {
            name: 'Tammi Donovan',
            score: 5,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/2.jpg'
        }, {
            name: 'Doreen Flowers',
            score: 4,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/3.jpg'
        }, {
            name: 'Price Pace',
            score: 2,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/4.jpg'
        }, {
            name: 'Larson Maldonado',
            score: 1,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/5.jpg'
        }, {
            name: 'Berg Bolton',
            score: 5,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/women/2.jpg'
        }, {
            name: 'Mack Lott',
            score: 3,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/6.jpg'
        }, {
            name: 'Rosanna Mcleod',
            score: 4,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/7.jpg'
        }, {
            name: 'Rosalie Rice',
            score: 1,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/8.jpg'
        }, {
            name: 'Virginia Buchanan',
            score: 2,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/women/3.jpg'
        }, {
            name: 'Lorna Stein',
            score: 4,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/9.jpg'
        }, {
            name: 'Rosalie Steele',
            score: 3,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/women/4.jpg'
        }, {
            name: 'Wilcox Boyd',
            score: 5,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/10.jpg'
        }, {
            name: 'Ollie Rice',
            score: 5,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/11.jpg'
        }
    ]
};

const control = {
    init: function () {
        sortView.init();
        sortView.render();

        listView.init();
        listView.render();

        scoresView.init();
        scoresView.render();

        profileView.init();
    },
    getAllNames: function () {
        return model.allPersons.map(el => el.name);
    },
    getAllScores: function () {
        return model.allPersons.map(el => el.score);
    },
    setCurrentPerson: function (index) {
        model.currentPerson = model.allPersons[index];
        this.viewCurrentProfile();
    },
    getCurrentPerson: function () {
        return model.currentPerson;
    },
    viewCurrentProfile: function () {
        profileView.render();
    },
    setCurrentPersonScore: function (value) {
        model.currentPerson.score = value;
        profileView.render();
        scoresView.render();
    },
    sortDataByName(isAscending = true) {
        model.allPersons.sort(function (firstArg, secondArg) {
            if (firstArg.name > secondArg.name) {
                return (isAscending) ? -1 : 1;
            }
            if (firstArg.name < secondArg.name) {
                return (isAscending) ? 1 : -1;
            }
            return 0;
        });
        listView.render();
        scoresView.render();
        sortView.render();
    },
    sortDataByScore(isAscending = true) {
        model.allPersons.sort(function (firstArg, secondArg) {
            const numA = Number(firstArg.score);
            const numB = Number(secondArg.score);
            if (numA > numB) {
                return (isAscending) ? -1 : 1;
            }
            if (numA < numB) {
                return (isAscending) ? 1 : -1;
            }
            return 0;
        });
        listView.render();
        scoresView.render();
        sortView.render();
    },
    sortDataByKey(sortKey, isAscending = true) {
        if (sortKey === "name") {
            this.sortDataByName(isAscending);
        }
        else if (sortKey === "score") {
            this.sortDataByScore(isAscending);
        }
    }
};

const listView = {
    init: function () {
        this.$container = $('.names');
        this.handleClicks();
    },
    render: function () {
        let template = control.getAllNames().reduce((acc, cur, i) => {
            return acc += `<li>${cur}</li>`;
        }, '');
        this.$container.html(template);
    },
    handleClicks: function () {
        this.$container.on('click', 'li', function (e) {
            let currentIndex = $(e.target).index();
            control.setCurrentPerson(currentIndex);
        });
    }
};

const scoresView = {
    init: function () {
        this.$container = $('.scores');
        this.handleClicks();
    },
    render: function () {
        let template = control.getAllScores().reduce((acc, cur) => {
            return acc += `
                <li>
                    <span>${cur}</span>
                    <input class="hidden score-input" type="text" value="${cur}">
                </li>
            `
        }, '');
        this.$container.html(template);
    },
    handleClicks: function () {
        this.$container.on('click', 'li', function (e) {
            let $currentLi = $(e.target);
            let $currentSpan = $currentLi.find('span');
            let $currentInput = $currentLi.find('input.score-input');
            let currentIndex = $currentLi.index();
            if (!$currentInput.is('.hidden')) {
                return false;
            }
            control.setCurrentPerson(currentIndex);
            $currentSpan.addClass('hidden');
            $currentInput.removeClass('hidden').focus();
        });
        this.$container.on('focusout .score-input', function (e) {
            let newScore = $(e.target).val();
            control.setCurrentPersonScore(newScore);
        });
    }
};

const profileView = {
    init: function () {
        this.$container = $('.profile');
    },
    render: function () {
        let currentPerson = control.getCurrentPerson();
        let template = `
            <img src="${currentPerson.photoUrl}">
            <h3>${currentPerson.name}</h3>
            <p>Score:${currentPerson.score}</p>
        `
        this.$container.html(template);
    }
};

const sortView = {
    init: function () {
        this.$container = $('.sort-controls');
        this.sortedColumn = {
            name: "init",
            score: "init"
        };
        this.handleClicks();
    },
    render: function () {
        let template = `<div class='sort-name'>
                            <div class='sort-title'>Name</div>
                            <div class='arrows-container ${this.sortedColumn.name}-sort-arrows'>
                                <div class='arrow up-arrow'></div>
                                <div class='arrow down-arrow'></div>
                            </div>
                        </div>
                        <div class='sort-score'>
                            <div class='sort-title'>Score</div>
                            <div class='arrows-container ${this.sortedColumn.score}-sort-arrows'>
                                <div class='arrow up-arrow'></div>
                                <div class='arrow down-arrow'></div>
                            </div>
                        </div>`;
        this.$container.html(template);
    },
    handleClicks: function () {

        this.$container.on("click", (eve) => {
            let findElem = eve.target;
            while (!findElem.parentElement.classList.contains("sort-controls")) {
                findElem = findElem.parentElement;
            }
            const sortKey = findElem.getElementsByClassName("sort-title")[0].innerText.toLowerCase();
            const sortType = this.sortedColumn[sortKey];
            this.sortedColumn.name = "init";
            this.sortedColumn.score = "init";
            if (sortType === "asc") {
                this.sortedColumn[sortKey] = "desc";
                control.sortDataByKey(sortKey, true);
            }
            else {
                this.sortedColumn[sortKey] = "asc";
                control.sortDataByKey(sortKey, false);
            }
        });

    }
};

control.init();