/*jslint nomen: true */
'use strict';

(function (root, factory) {
	if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		factory(
			require('../../build/sproutid')
		);
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define([
			'../../build/sproutid'
		], factory);
	} else {
		// Browser globals
		factory(root.sproutid);
	}
}(this, function factory(sproutId) {

	describe("sproutid", function(){
		it("shoudl run", function(){
			var urlArray, colNames;

			urlArray = [
				'/*/user/name',
				'/*/user/id',
				'/*/user/lang',
				'/*/text',
				'/*/id',
				'/*/url',
				'/*/followers_count'
			];

			colNames = [
				"name",
				"user id",
				"language",
				"text",
				"twitter id",
				"url",
				"follower count"
			];

			console.log("urlArray = %j", urlArray);
			console.log("colNames = %j", colNames);



			console.log("sproutId.uriTree(urlArray, colNames)");
			console.log(sproutId.uriTree(urlArray, colNames));

			console.log("2 sproutId.uriTree(urlArray, colNames)");
			console.log(sproutId.uriTree(urlArray));

		});
	});


}));






describe("sproutid2", function(){
	it("shoudl run 2", function(){
		console.log("I ran 2");
	});
});
