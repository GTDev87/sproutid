/*jslint nomen: true */
'use strict';

var _ = require('underscore');

exports.uriTree = function (uriArray, columnNameArray) {

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

	//private functions
	function uriLabelsIntoColumnTree(uriLabelsObject) {
		var uriArrayTree,
			locationLabelArray;

		locationLabelArray = _.chain(uriLabelsObject)
			.pairs()
			.map(function (uriLabel) {
				var uri = uriLabel[0],
					label = uriLabel[1],
					headTail;
				if (uri[0] !== '/') {throw "no slash"; }
				headTail = separateUriHeadAndTail(uri);

				return [headTail[0], [headTail[1], label]];
			})
			.value();

		uriArrayTree = combineArrayLocationLabels(locationLabelArray);

		return _.chain(uriArrayTree)
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
			)
			.value();
	}

	if(columnNameArray === undefined){
		columnNameArray = _(uriArray.length).times(function(){return 1; });
	}

	return uriLabelsIntoColumnTree(_.object(uriArray, columnNameArray));
};