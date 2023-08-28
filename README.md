# delairebc.org Frontend Repo

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How this site works

-   When a page is enterd on the url the site gets the route in the url and uses it to fetch data from sanity.io. This happens in the route src/core/body/index

-   That data is formated in the api formated fround in src/core/body/apiFormater

-   The formated data is an array of objects that contain two properties. A name(may not be called name but you get the idea) property and props property. Inside of the create body funtion, the formated data is mapped to an array of components

-   The name property determins what componet to display and the props will be passed into that displayed component

-   Some componets will make API calls inside its component. Not all data will be fetched durring the formating process.
