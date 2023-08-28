import { useState, useEffect } from 'react';
import getLiveVideoID from 'api/getLiveVideo';
import getLastVideoUploadID from 'api/getLastVideoUpload';

export default function useGetVideoAPI(meta) {
   let { channelID, videoType, apiKey } = meta;
   let [videoMeta, setVideoMeta] = useState({
      isLoading: true,
      hasFailed: false,
      notLive: null,
      id: null,
   });
   useEffect(() => {
      if (!videoMeta.isLoading) return;
      if (videoType === 'static') return;

      if (videoType === 'live') {
         getLiveVideoID(apiKey, channelID)
            .then(id => {
               setVideoMeta({
                  isLoading: false,
                  hasFailed: false,
                  notLive: false,
                  id: id,
               });
            })
            .catch(err => {
               if (err.notLive) {
                  setVideoMeta({
                     isLoading: false,
                     hasFailed: false,
                     notLive: true,
                     id: null,
                  });
               } else {
                  setVideoMeta({
                     isLoading: false,
                     hasFailed: true,
                     notLive: false,
                     id: null,
                  });
               }
            });
      } else if (videoType === 'lastVideo') {
         //Do what you have to do
         getLastVideoUploadID(apiKey, channelID)
            .then(id => {
               setVideoMeta({
                  isLoading: false,
                  hasFailed: false,
                  notLive: false,
                  id: id,
               });
            })
            .catch(err => {
               setVideoMeta({
                  isLoading: false,
                  hasFailed: true,
                  notLive: false,
                  id: null,
               });
            });
      }
   }, [videoMeta, channelID, videoType, apiKey]);

   return videoMeta;
}
