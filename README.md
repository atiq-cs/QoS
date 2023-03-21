# Quality of Service
CSE570 - Wireless and Mobile Networks Project

Two components are currently in repository
 1. Linux Hotspot Configuration and netem settings
 2. js code using Youtube API

Changes in ASP.Net MVC Project
[Instructions for Fedora](http://tech.saoslab.com/post/2015/11/20/fedora-22-setting-up-hostapd-to-create-hotspot)

**2015-11 snapshot**  
On navbar we linked it like below,

    <li>@Html.ActionLink("QoS Project", "Index", "WLService")</li>


And, content of the controller: `Controllers\WLServiceController.cs`,

```csharp
public class WLServiceController : Controller
{
    // GET: WLService
    /*public ActionResult Index()
    {
        return View();
    }*/
    public ActionResult Index(string video_id)
    {
        if (String.IsNullOrEmpty(video_id))
            video_id = "M7lc1UVf-VE";
        ViewBag.vid = video_id;
        return View();
    }
}
```

Our Viewsh html file `Views\WLService\Index.cshtml` content,

```js
@{
    // Some remarks about this file
    // This is the index file for load testing
    // Get difference time between loading the video and playing the video
    // Set when it is buffering and or doing other activity
    // 
    ViewBag.Title = "Index";
}

@section scripts {
    <!-- Use this when published to site
    Scripts.Render("~/bundles/yt_qos")  
        to make debugging easier for now,
        instead use this -->
    <script type="text/javascript" src="@Url.Content("~/Scripts/yt_qos/main.js")"></script>
}

<h2>Youtube LoadTest</h2>

<p>This is the embedded youtube video for the experiment</p>
<!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
<div id="player"></div>

<h4>Streaming Info</h4>
<div id="yt_frozen_info">Frozen Info</div>
<!-- div id="yt_play_info">Play Info</ div -->
<div id="yt_play_info">@ViewBag.vid</div>
<div id="yt_event_info">Listening to API events</div>
```