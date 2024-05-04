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


@api.route("/current_status")
def current_status():
    CURRENT_STATUS = os.path.join(HERE, "sql/workflows_current_status.sql")
    resp = run_sql(file_path=CURRENT_STATUS, kbq=BIGQUERY_OBJECT)

    return jsonify(resp.to_dicts())


@api.route("/get_all_runs")
def get_all_runs():
    ALL_RUNS = os.path.join(HERE, "sql/workflows_all_runs.sql")
    resp = run_sql(file_path=ALL_RUNS, kbq=BIGQUERY_OBJECT)

    return jsonify(resp.to_dicts())


@api.route("/get_run_percentage")
def get_run_percentage():
    ALL_RUNS = os.path.join(HERE, "sql/workflows_percentage.sql")
    resp = run_sql(file_path=ALL_RUNS, kbq=BIGQUERY_OBJECT)

    return jsonify(resp.to_dicts())


@api.route("/get_run_summary")
def get_run_summary():
    ALL_RUNS = os.path.join("sql/workflows_summary.sql")
    resp = run_sql(file_path=ALL_RUNS, kbq=BIGQUERY_OBJECT)

    return jsonify(resp.to_dicts())
