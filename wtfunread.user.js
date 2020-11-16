// ==UserScript==
// @name         mywtf_unread_real
// @namespace    WTDWTF
// @version      0.6.2
// @description  mark topics unread that are read but not all the way
// @author       hungrier
// @match        https://what.thedailywtf.com/*
// @match        http://what.thedailywtf.com/*
// @grant        none
// @downloadURL  https://github.com/hungrierwtf/mywtf_unread_real/raw/master/wtfunread.user.js
// @homepageURL  https://github.com/hungrierwtf/mywtf_unread_real/
// ==/UserScript==


// how to do it for real
// get all untagged* topics
// for each one
//   determine last read and latest post number using the preview url/title url
//   tag it:
//     new topic / new posts / half-read / fully read
//     how many more posts
//     and the css of course
//   for new topics, stick a "NEW!" starburst or something there
//   for not fully read ones, put the number of new posts
// it'll be great


(function() {
    'use strict';

    // https://what.thedailywtf.com/topic/27647/re-welcome-to-the-lounge/9
    // https://what.thedailywtf.com/topic/21563/the-unofficial-funny-comic-strips-thread/726
    // https://what.thedailywtf.com/topic/27631/anyone-with-3rd-gen-ryzen-to-borrow/58
    // https://what.thedailywtf.com/topic/27652/what-is-evidence
    //                             /topic/\d+/[^/]+(/(\d+))?
    const regex = /\/topic\/\d+\/[^\/]+(\/(\d+))?/m;

    function getTopicPostNumber(url) {
        let m = regex.exec(url);
        if (m && m.length > 2 && m[2]) {
            return m[2];
        } else {
            return '1';
        }
    }

    function markUnreadTopics() {
        //console.log('marking unread');
        var topicsNodeList = document.querySelectorAll('ul.topic-list li:not(.unread)');
        var topics = Array.from(topicsNodeList);
        var incompleteTopics = topics.filter((t)=> {
            var titleUrl = t.querySelector('a[itemprop=url]').href;
            var previewUrl = t.querySelector('a.permalink').href;
            let titleNum = getTopicPostNumber(titleUrl);
            let prevNum = getTopicPostNumber(previewUrl);
            return !t.classList.contains('half-read') && prevNum !== titleNum;
        });

        incompleteTopics.map((t)=>{
            t.classList.add('half-read');
        });
    }

    $(window).on('action:topics.loaded', markUnreadTopics);
})();
