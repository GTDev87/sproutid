/*jslint nomen: true */
'use strict';

var sproutId = require('../src/sproutid.js'),
	urlArray,
	colNames;

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
