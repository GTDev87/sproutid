/*jslint nomen: true */

/*global beforeEach, afterEach, describe, it, expect */

/*global console */
/*global debugger */
/*global dependencies */

dependencies({'sproutid' : '../../build/sproutid'}).init(this, function (sproutid) {
    'use strict';

    describe("uriTree", function () {
        var urlArray, colNames;

        beforeEach(function () {
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
        });

        it("should create a labeled uri tree", function () {
            var labeledUriTree = sproutid.uriTree(urlArray, colNames);

            expect(labeledUriTree['*'].user.name).toBe('name');
            expect(labeledUriTree['*'].user.id).toBe('user id');
            expect(labeledUriTree['*'].user.lang).toBe('language');
            expect(labeledUriTree['*'].text).toBe('text');
            expect(labeledUriTree['*'].id).toBe('twitter id');
            expect(labeledUriTree['*'].url).toBe('url');
            expect(labeledUriTree['*'].followers_count).toBe('follower count');
        });

        it("should create a unlabeled uri tree", function () {
            var unlabeledUriTree = sproutid.uriTree(urlArray);

            expect(unlabeledUriTree['*'].user.name).toBe(1);
            expect(unlabeledUriTree['*'].user.id).toBe(1);
            expect(unlabeledUriTree['*'].user.lang).toBe(1);
            expect(unlabeledUriTree['*'].text).toBe(1);
            expect(unlabeledUriTree['*'].id).toBe(1);
            expect(unlabeledUriTree['*'].url).toBe(1);
            expect(unlabeledUriTree['*'].followers_count).toBe(1);
        });
    });

    describe("headTail", function () {
        it("should split array of uri parts", function () {
            var headTailPair = sproutid.headTail(['twitter', 'user', 'greg', 'id']),
                head = headTailPair[0],
                tail = headTailPair[1];

            expect(head).toBe('twitter');
            expect(tail).toBe('/user/greg/id');
        });
    });

    describe("separateUriHeadAndTail", function () {
        it("should split uri head from tail", function () {
            var headTailPair = sproutid.separateUriHeadAndTail('/twitter/user/greg/id'),
                head = headTailPair[0],
                tail = headTailPair[1];

            expect(head).toBe('twitter');
            expect(tail).toBe('/user/greg/id');
        });
    });
});