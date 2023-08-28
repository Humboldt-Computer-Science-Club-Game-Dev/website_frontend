import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import galleryLogic from './galleryLogic';

export default function useSortedImages(images) {
   const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

   let {
      sortImagesForDesctop,
      sortImagesForDesctopAfterError,
      sortImagesForMobile,
   } = galleryLogic;

   let [sortedImages, setSortedImages] = useState(runSetUpSortedImages());

   useEffect(() => {
      let newImages;

      if (isMobile) {
         newImages = sortImagesForMobile(images);
         if (!deepEqual(newImages, sortedImages))
            setSortedImages(sortImagesForMobile(images));
      } else {
         try {
            if (sortedImages !== sortImagesForDesctop(images)) {
               newImages = sortImagesForDesctop(images);
               if (!deepEqual(newImages, sortedImages))
                  setSortedImages(sortImagesForDesctop(images));
            }
         } catch {
            newImages = sortImagesForDesctopAfterError(images);
            console.error('Failed to sort images');
            if (!deepEqual(newImages, sortedImages))
               setSortedImages(sortImagesForDesctopAfterError(images));
         }
      }
   }, [
      isMobile,
      sortedImages,
      images,
      sortImagesForDesctop,
      sortImagesForDesctopAfterError,
      sortImagesForMobile,
   ]);

   return sortedImages;

   function runSetUpSortedImages() {
      if (isMobile) {
         return sortImagesForMobile(images);
      } else {
         try {
            let dskImages = sortImagesForDesctop(images);
            return dskImages;
         } catch {
            console.error('Failed to sort images');
            return sortImagesForDesctopAfterError(images);
         }
      }
   }
}

function deepEqual(object1, object2) {
   const keys1 = Object.keys(object1);
   const keys2 = Object.keys(object2);
   if (keys1.length !== keys2.length) {
      return false;
   }
   for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
         (areObjects && !deepEqual(val1, val2)) ||
         (!areObjects && val1 !== val2)
      ) {
         return false;
      }
   }
   return true;
}
function isObject(object) {
   return object !== null && typeof object === 'object';
}
