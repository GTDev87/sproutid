/*jslint node: true, nomen: true */
'use strict';

var _ = require("underscore");

function headTail(array) {return [_.first(array), "/" + _.tail(array).join('/')]; }

function separateUriHeadAndTail(uri) {return headTail(uri.slice(1).split("/")); }

function combineArrayLocationLabels(locationLabelArray) {
    return _.reduce(
        locationLabelArray,
        function (aggHistogramTree, locationLabel) {
            var location = locationLabel[0],
                locLabel = locationLabel[1];
            if (aggHistogramTree[location] === undefined) {aggHistogramTree[location] = []; }
            aggHistogramTree[location].push(locLabel);
            return aggHistogramTree;
        },
        {}
    );
}

function uriLabelsIntoColumnTree(uriLabelsObject) {
    var uriArrayTree, locationLabelArray;

    locationLabelArray = _(uriLabelsObject)
        .pairs()
        .map(function (uriLabel) {
            var uri = uriLabel[0],
                label = uriLabel[1],
                headTail;
            if (uri[0] !== '/') {throw "no slash"; }
            headTail = separateUriHeadAndTail(uri);

            return [headTail[0], [headTail[1], label]];
        });

    uriArrayTree = combineArrayLocationLabels(locationLabelArray);

    return _(uriArrayTree)
        .pairs()
        .reduce(
            function (aggTree, locationUriArray) {

                var newLocationLabels = _.object(locationUriArray[1]);

                if (newLocationLabels["/"] !== undefined) {
                    aggTree[locationUriArray[0]] = newLocationLabels["/"];
                } else {
                    aggTree[locationUriArray[0]] = uriLabelsIntoColumnTree(newLocationLabels);
                }

                return aggTree;
            },
            {}
        );
}

function uriTree(uriArray, columnNameArray) {

    if (columnNameArray === undefined) {
        columnNameArray = _(uriArray.length).times(function () {return 1; });
    }

    return uriLabelsIntoColumnTree(_.object(uriArray, columnNameArray));
}

module.exports = {
    name: "sproutid",
    version: "0.0.1",
    headTail: headTail,
    separateUriHeadAndTail: separateUriHeadAndTail,
    combineArrayLocationLabels: combineArrayLocationLabels,
    uriLabelsIntoColumnTree: uriLabelsIntoColumnTree,
    uriTree: uriTree
};