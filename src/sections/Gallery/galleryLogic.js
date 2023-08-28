let galleryLogic = {
   divideImagesIntoTallsAndWides: images => {
      let talls = [];
      let wides = [];
      for (let i = 0; i < images.length; i++) {
         let image = images[i];

         if (image.isTall) {
            talls.push(image);
         } else if (image.isWide) {
            wides.push(image);
         }
      }

      return { talls: talls, wides: wides };
   },

   sortImagesForDesctopAfterError: images => {
      let sortedImages = [];

      images.forEach(image => {
         image.isWide = false;
         image.isTall = true;
         sortedImages.push(image);
      });

      return sortedImages;
   },

   sortImagesForMobile: images => {
      let sortedImages = [];
      let { talls, wides } = galleryLogic.divideImagesIntoTallsAndWides(images);
      let tallIndex = 0;
      let wideIndex = 0;

      let currentSize = 'tall';

      for (let i = 0; i < images.length; i++) {
         let switchIndex = i % 2 === 0 ? 1 : 0;
         if (!talls[tallIndex]) {
            for (let j = wideIndex; j < wides.length; j++) {
               if (currentSize === 'tall') {
                  wides[j].isTall = true;
                  wides[j].isWide = false;
                  sortedImages.push(wides[j]);
               } else {
                  sortedImages.push(wides[j]);
               }
               if (switchIndex !== 0 && switchIndex % 2 === 0) {
                  currentSize = toggleCurrentSize(currentSize);
               }
               switchIndex++;
            }
            break;
         } else if (!wides[wideIndex]) {
            for (let j = tallIndex; j < talls.length; j++) {
               sortedImages.push(talls[j]);
            }
            break;
         } else if (currentSize === 'tall') {
            sortedImages.push(talls[tallIndex]);
            ++tallIndex;
         } else {
            sortedImages.push(wides[wideIndex]);
            ++wideIndex;
         }

         if (i !== 0 && i % 2 !== 0) {
            currentSize = toggleCurrentSize(currentSize);
         }
      }

      return sortedImages;

      function toggleCurrentSize(currentSize) {
         let newSize;
         currentSize === 'tall' ? (newSize = 'wide') : (newSize = 'tall');
         return newSize;
      }
   },

   sortImagesForDesctop: images => {
      let sortedImages = [];
      let { talls, wides } = galleryLogic.divideImagesIntoTallsAndWides(images);
      let tallIndex = 0;
      let wideIndex = 0;

      for (let i = 0; i < images.length; i++) {
         let initalStatus = ((i, j, main) => {
            let tallTest = galleryLogic.testforDesctopTall(i, j, main);
            let wideTest = galleryLogic.testforDesctopWide(i, j, main);
            return tallTest || wideTest;
         })(tallIndex, wideIndex, i);
         let currentSize = initalStatus.indexOf('Tall') > -1 ? 'tall' : 'wide';
         if (!talls[tallIndex]) {
            let compareK = 0;
            for (let k = wideIndex; k < wides.length; k++) {
               let currentWide = wides[k];
               if (compareK % 2 === 0 && currentSize === 'wide') {
                  sortedImages.push(currentWide);
                  currentSize = 'tall';
               } else if (currentSize === 'wide') {
                  sortedImages.push(currentWide);
               } else if (compareK % 2 === 0 && currentSize === 'tall') {
                  currentWide.isWide = false;
                  currentWide.isTall = true;
                  sortedImages.push(currentWide);
                  currentSize = 'wide';
               } else {
                  currentWide.isWide = false;
                  currentWide.isTall = true;
                  sortedImages.push(currentWide);
               }

               ++compareK;
            }

            break;
         } else if (!wides[wideIndex]) {
            for (let i = tallIndex; i < talls.length; i++) {
               sortedImages.push(talls[i]);
            }
            break;
         }
         let shouldPushWide = galleryLogic.testforDesctopWide(
            tallIndex,
            wideIndex,
            i
         );
         let shouldPushTall = galleryLogic.testforDesctopTall(
            tallIndex,
            wideIndex,
            i
         );

         if (shouldPushTall) {
            sortedImages.push(talls[tallIndex]);
            ++tallIndex;
         } else if (shouldPushWide) {
            sortedImages.push(wides[wideIndex]);
            ++wideIndex;
         }
      }

      return sortedImages;
   },

   testforDesctopWide: (i, j, main) => {
      //i = tall
      //j = wide
      i -= 1; //To ofset for the first one being a tall
      if (main === 0) {
         return false;
      }
      if (main === 1) {
         return 'firstWide';
      }
      if (i === j) {
         return 'firstWide';
      } else if (j % 2 !== 0) {
         return 'seceondWide';
      } else {
         return false;
      }
   },

   testforDesctopTall: (i, j, main) => {
      //i = tall
      //j = small
      i -= 1; //To ofset for the first one being a tall
      if (main === 0) {
         return 'firstTall';
      }
      if (main === 1) {
         return false;
      }
      if (i === j || j % 2 !== 0) {
         return false;
      } else if (j - i === 2) {
         return 'firstTall';
      } else {
         return 'seceondTall';
      }
   },
};

export default galleryLogic;
