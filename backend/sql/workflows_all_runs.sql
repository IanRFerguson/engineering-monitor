WITH
    base AS (
        SELECT

            date_trunc(runtime_started_at, DAY) AS day_run,
            parent_workflow_name,
            array_agg(status) AS status_array

        FROM `raw_internal_monitoring.civis_production_sync_ins`
        WHERE category = 'workflow'
            AND lower(parent_workflow_name) LIKE '%prod%'
        GROUP BY 1,2
    ),

    agg AS (
        SELECT

            day_run,
            parent_workflow_name,
            LOGICAL_OR('succeeded' IN UNNEST(status_array)) AS run_succeeded,
            LOGICAL_OR('failed' IN UNNEST(status_array) AND 'succeeded' NOT IN unnest(base.status_array)) AS run_failed
    
        FROM base
        GROUP BY 1,2
    ),

    summary AS (
        SELECT

            day_run,
            COUNT(*) AS total_runs,
            COUNTIF(run_succeeded) AS total_successful_runs

        FROM agg
        GROUP BY 1
        ORDER BY 1 ASC
    )

SELECT

    day_run,
    ROUND(total_successful_runs / total_runs) AS successful_run_percentage

FROM summary