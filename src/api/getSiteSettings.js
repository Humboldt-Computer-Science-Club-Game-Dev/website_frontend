import client from "config/sanityClient";
async function getSiteSettings() {
  return new Promise((resolve) => {
    const query = `*[_type == "siteSettings"][0]{...}`;

    client
      .fetch(query)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        resolve(console.error(err));
      });
  });
}

export default getSiteSettings;
