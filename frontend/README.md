# React Frontend

This is a pretty standard React app - it calls the Flask backend to receive data from BigQuery, and renders the results in various ways (in a table, in a line chart, etc.). Some of the basic commands...

```
# Install your dependencies
npm install

# Run the app locally
npm run start

# Compile the React app to use in conjunction with the Flask app
npm run build
```

## Architecture
Everything in the `public/` folder is ultimately populated by the compiled React code.

The `src/` folder has a little more nuance...
* `index.js` pulls in `components/App.js`
* The various functional components are pulled into `App.js` and are instantiated in the return call
* The static files that need to be compiled are also defined here - see `src/static`