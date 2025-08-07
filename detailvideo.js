function beritaVideo()
{
    const API_KEY = "AIzaSyDYbJ8vmu0eG7C-MC1PVwAPxPA3I9DTcG0";
    const CHANNEL_ID = "UC6JOSeUGezJtcMT-x5FtkOA";

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("video-container");

        data.items.forEach(item => {
        if (item.id.kind === "youtube#video") {
            const videoId = item.id.videoId;
            const iframe = document.createElement("iframe");
            iframe.width = 300;
            iframe.height = 500;
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.frameBorder = 0;
            iframe.allowFullscreen = true;

            container.appendChild(iframe);
        }
        });
    });

}