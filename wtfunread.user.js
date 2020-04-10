// ==UserScript==
// @name         mywtf_unread_real
// @namespace    WTDWTF
// @version      0.6.1
// @description  mark topics unread that are read but not all the way
// @author       hungrier
// @match        https://what.thedailywtf.com/*
// @match        http://what.thedailywtf.com/*
// @grant        none
// @downloadURL  https://github.com/hungrierwtf/mywtf_unread_real/raw/master/wtfunread.user.js
// @homepageURL  https://github.com/hungrierwtf/mywtf_unread_real/
// ==/UserScript==

(function() {
    'use strict';

    function markUnreadTopics() {
        //console.log('marking unread');
        var topicsNodeList = document.querySelectorAll('ul.topic-list li:not(.unread)');
        var topics = Array.from(topicsNodeList);
        var incompleteTopics = topics.filter((t)=> {
            var titleUrl = t.querySelector('a[itemprop=url]').href;
            var previewUrl = t.querySelector('a.permalink').href;
            return !t.classList.contains('half-read') && titleUrl !== previewUrl;
        });

        incompleteTopics.map((t)=>{
            t.classList.add('half-read');
        });
    }

    $(window).on('action:topics.loaded', markUnreadTopics);
})();
