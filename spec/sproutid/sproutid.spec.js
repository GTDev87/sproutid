/*jslint nomen: true */

/*global beforeEach, afterEach, describe, it, expect */

/*global console */
/*global init */

init(this, function (sproutid) {
    'use strict';

    describe("sproutid", function () {
        it("shoudl run", function () {
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

            console.log("sproutid.uriTree(urlArray, colNames)");
            console.log(sproutid.uriTree(urlArray, colNames));

            console.log("2 sproutid.uriTree(urlArray, colNames)");
            console.log(sproutid.uriTree(urlArray));

        });
    });
});