/*
 * Youtube QoS
 *
 */

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
var start_time, end_time;
var total_frozen_time=0, total_play_time=0;
var info_tag = document.getElementById('yt_event_info');
var frozen_tag = document.getElementById('yt_frozen_info');
var play_tag = document.getElementById('yt_play_info');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
// These two functions won't be required if use Data function only
// For todays date;
Date.prototype.today = function () {
    return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    info_tag.innerHTML = "player is ready";
    // print date and time
    /* var newDate = new Date();
    var datetime = "Query DateTime: " + newDate.today() + " " + newDate.timeNow();
    console.log(datetime); */
    start_time = +new Date();
    // event.target.playVideo();
    playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
var last_state=null;
function onPlayerStateChange(event) {
    // catching all events: https://developers.google.com/youtube/iframe_api_reference#Events
    switch (event.data) {
        case YT.PlayerState.PLAYING:
            info_tag.innerHTML = 'event: playing video';

            // get elapsed time since first buffering event
            if (last_state == null || last_state === YT.PlayerState.BUFFERING) {
                // this is a freezing duration
                end_time = +new Date();
                var diff = end_time - start_time;
                total_frozen_time += diff;
                var str = "Video Frozen Time: " + diff + "ms / " + total_frozen_time + " ms";
                frozen_tag.innerHTML = str;
            }
            if (!done) {
                /* / print date and time
                var newDate = new Date();
                var datetime = "Query DateTime: " + newDate.today() + " " + newDate.timeNow();
                console.log(datetime); */
                setTimeout(stopVideo, 6000);
                done = true;
            }
            break;
        case YT.PlayerState.PAUSED:
            info_tag.innerHTML = 'event: paused video';
            break;
        case YT.PlayerState.BUFFERING:
            if (last_state !== null && last_state !== YT.PlayerState.BUFFERING) {
                start_time = +new Date();
            }
            info_tag.innerHTML = 'event: buffering video';
            break;
        case YT.PlayerState.CUED:
            info_tag.innerHTML = 'event: cued video';
            break;
        case YT.PlayerState.ENDED:
            info_tag.innerHTML = 'event: streaming finished';
            break;
        default:
            // do nothing
    }
    last_state = event.data;
}
function playVideo() {
    info_tag.innerHTML = 'event: play video';
    player.playVideo();
}
function pauseVideo() {
    info_tag.innerHTML = 'event: pause video';
    player.pauseVideo();
}
function stopVideo() {
    info_tag.innerHTML = 'event: stop video';
    player.stopVideo();
}
