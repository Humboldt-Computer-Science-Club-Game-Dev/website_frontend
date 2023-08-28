export default function getLiveVideoID(apiKey, channelID) {
   if (!apiKey || !channelID) {
      return Promise.reject({
         message:
            'You must provide an apiKey and channelID inorder to use getLiveVideoID API',
      });
   }

   const URL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelID}&part=snippet,id&order=date&maxResults=1`;
   return new Promise((resolve, reject) => {
      fetch(URL, {
         method: 'get',
      })
         .then(res => {
            return res.json();
         })
         .then(stats => {
            if (!stats.items || stats.items.length < 1) {
               return reject({
                  message: 'Faild to fetch videos from channelID and apiKey',
               });
            }

            let channelData = stats.items[0];
            if (!channelData.id && !channelData.id.videoId)
               return reject({
                  message: 'Faild to fetch videos from channelID and apiKey',
               });

            let videoID = channelData.id.videoId;
            resolve(videoID);
         })
         .catch(err => {
            reject(err);
         });
   });
}
