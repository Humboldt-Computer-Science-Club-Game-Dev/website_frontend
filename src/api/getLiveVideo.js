//https://www.googleapis.com/youtube/v3/search?part=snippet&channelId={YOUR_CHANNEL_ID}&eventType=live&type=video&key={YOUR_API_KEY}

export default function getLiveVideoID(apiKey, channelID) {
   if (!apiKey || !channelID) {
      return Promise.reject({
         message:
            'You must provide an apiKey and channelID inorder to use getLiveVideoID API',
      });
   }
   const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&eventType=live&type=video&key=${apiKey}`;

   return new Promise((resolve, reject) => {
      fetch(URL, {
         method: 'get',
      })
         .then(res => {
            return res.json();
         })
         .then(stats => {
            if (!stats.items || stats.items.length < 1)
               return reject({
                  message:
                     'Live stream is not preasent\nitems property from API request is undefined',
                  notLive: true,
               });

            let streamData = stats.items[0];
            if (!streamData.id && !streamData.id.videoId)
               return reject({
                  message: 'The live stream data dose not contain video id',
               });

            let videoID = streamData.id.videoId;
            resolve(videoID);
         })
         .catch(err => {
            reject(err);
         });
   });
}
