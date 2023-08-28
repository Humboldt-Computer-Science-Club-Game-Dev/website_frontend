import client from 'config/sanityClient';

export default function getNavOptions() {
   return new Promise((resolve, reject) => {
      const query = `*[_type == "page"]{pageDisplayName, slug, onClick, navIcon, navPriority, hideIf}`;
      client
         .fetch(query)
         .then(pages => {
            client.getDocuments(['footer', 'siteSettings']).then(results => {
               resolve({
                  rawNav: pages,
                  rawFooter: results[0],
                  rawSettings: results[1],
               });
            });
         })
         .catch(err => {
            reject(err);
         });
   });
}
