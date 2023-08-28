import client from 'config/sanityClient';

export default function getPageFromRef(ref) {
   const query = `*[_type == "page" && _id == "${ref}"]`;
   return new Promise((resolve, reject) => {
      client
         .fetch(query)
         .then(pages => {
            resolve(pages[0]);
         })
         .catch(err => {
            reject(err);
         });
   });
}
