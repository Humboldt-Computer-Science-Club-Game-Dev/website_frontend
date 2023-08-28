import client from 'config/sanityClient';

export default function getRefs(ref) {
   const query = `*[_id == "${ref}"]`;
   return new Promise((resolve, reject) => {
      client
         .fetch(query)
         .then(refs => {
            resolve(refs[0]);
         })
         .catch(err => {
            reject(err);
         });
   });
}
