from klondike.bigquery.bigquery import BigQueryConnector

##########


def run_sql(file_path: str, kbq: BigQueryConnector):
    """
    Reads a local SQL file and runs against BigQuery API
    """

    with open(file_path) as _file_:
        sql = _file_.read()

    result = kbq.read_dataframe_from_bigquery(sql=sql)

    return result
