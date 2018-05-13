

const app = angular.module('app', []);

app.controller("MainCtrl", ["$scope", function ($scope) {
    $scope.posts = posts;
    $scope.viewedPosts = posts;
    $scope.filterStr = "";
    $scope.availableCategories = [];
    $scope.onFilterChangeHandler = onFilterChangeHandler;
    $scope.extractCategories = extractCategories;
    $scope.isAddPost = false;
    $scope.editedValue = {};

    $scope.onAddHandler = function () {
        $scope.editedValue = {};
        $scope.isAddPost = true;
    };

    $scope.onSavePostHandler = function () {
        $scope.editedValue.categories = $scope.editedValue.categories.split(" ");
        $scope.editedValue.url = $scope.editedValue.url || "assets/default.jpg";
        $scope.posts.push($scope.editedValue);

        extractCategories();

        $scope.isAddPost = false;
    };

    $scope.onAddCancelHandler = function () {
        $scope.isAddPost = false;
    };

    extractCategories();

    function onFilterChangeHandler() {
        _filterPosts();
    }

    function extractCategories() {
        $scope.availableCategories = [];
        $scope.posts.forEach(post => {
            post.categories.forEach(category => {
                $scope.availableCategories.push(category.trim());
            });
        });

        if (!$scope.availableCategories.length) {
            return;
        }

        let tempValue = "";
        $scope.availableCategories.sort((a, b) => a > b);
        $scope.availableCategories = $scope.availableCategories.filter(el => {
            if (tempValue !== el) {
                tempValue = el;
                return el;
            }
            else {
                return false;
            }
        });

    }

    function _filterPosts() {
        const regEx = new RegExp($scope.filterStr.toLowerCase());
        $scope.viewedPosts = $scope.posts.filter(el => {
            if (regEx.test(el.categories.join(" ").toLowerCase())) {
                return true;
            }
            return false;
        });

    }

}]);



app.directive("postDir", [function () {
    return {
        restrict: "E",
        replace: false,
        scope: {
            post: "=",
            save: "&"
        },
        template:
            `<div class="post">
            <h2 class="center-text">{{post.title}}</h2>
            <img class="img-fill" src="{{post.url}}" alt="{{post.title}}">
            <ul class="categories-list">
                <li class="category-item" ng-repeat="el in post.categories track by $index">{{el}}</li>
            </ul>
            <p class="center-text">
                {{post.description}}
            </p>
            <div class="edit-extended-content" ng-if="isEdit">
                <label class="edit-label" for="title">Title:</label>
                <input class="edit-input-cell" id="title" type="text" ng-model="editedValue.title">
                <label class="edit-label" for="categories">Categories:</label>
                <input class="edit-input-cell" id="categories" type="text" value="{{categories}}">
                <label class="edit-label" for="description">Description:</label>
                <textarea class="edit-input-area" rows="10" id="description" type="text" ng-model="editedValue.description"></textarea>
                <label class="edit-label" for="photoUrl">Photo's url:</label>
                <input class="edit-input-cell" id="photoUrl" type="text" ng-model="editedValue.url">
            </div>
            <div class="post-actions">
                <button ng-if="!isEdit" class="post-action-btn" ng-click="onEditClick()">Edit</button>
                <button ng-if="isEdit" class="post-action-btn" ng-click="onSaveClick(editedValue)">Save</button>
                <button ng-if="isEdit" class="post-action-btn" ng-click="onCancelClick()">Cancel</button>
            </div>
        </div>`,
        link: function (scope, element, attr) {

            scope.isEdit = false;
            scope.editedValue = Object.assign({}, scope.post);


            scope.onEditClick = function () {
                scope.isEdit = true;
                scope.categories = scope.post.categories.join(" ");
            };

            scope.onSaveClick = function (obj) {
                obj.categories = document.getElementById("categories").value.split(" ");
                Object.assign(scope.post, obj);
                scope.isEdit = false;
                scope.save();
            }

            scope.onCancelClick = function () {
                scope.isEdit = false;
            };

        }
    };
}]);

