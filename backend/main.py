from flask import Flask, jsonify, render_template
from utilities.sql_runner import run_sql
from klondike.bigquery.bigquery import BigQueryConnector
import os

###########

api = Flask(
    __name__,
    static_folder="../frontend/build",
    static_url_path="/",
    template_folder="../frontend/build",
)

BIGQUERY_OBJECT = BigQueryConnector(os.environ["GOOGLE_APPLICATION_CREDENTIALS"])
HERE = os.path.dirname(__file__)


@api.route("/")
def serve():
    """
    Main route - renders the React app post-build
    """

    return render_template("index.html")


@api.route("/get_metadata")
def get_metadata():
    METADATA = os.path.join(HERE, "sql/workflow_metadata.sql")
    resp = run_sql(file_path=METADATA, kbq=BIGQUERY_OBJECT)

    return jsonify(resp.to_dicts())


@api.route("/current_status")
def current_status():
    CURRENT_STATUS = os.path.join(HERE, "sql/workflows_current_status.sql")
    resp = run_sql(file_path=CURRENT_STATUS, kbq=BIGQUERY_OBJECT)

    return jsonify(resp.to_dicts())


@api.route("/daily_average")
def daily_average():
    DAILY_AVERAGE = os.path.join(HERE, "sql/workflows_average_per_day.sql")
    resp = run_sql(file_path=DAILY_AVERAGE, kbq=BIGQUERY_OBJECT)

    return jsonify(resp.to_dicts())
