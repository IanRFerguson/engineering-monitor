# Flask Backend

This is essentially just a backend bridge to (a) serve the React frontend and (b) manage API calls to BigQuery.

## Architecture

* We're using `gunicorn` as a WSGI server - that runs the `wsgi.py` file, which pulls in the Flask application from `main.py`
* `main.py` contains all of the API calls we'll need to make to obtain data from BigQuery
* All of the SQL to execute is defined in `sql/`
* The SQL runner is powered by `klondike`, and is defined in `utilities/sql_runner.py`