WITH
    last_monitored AS (
        SELECT 

            MAX(runtime_started_at) AS runtime 
            
        FROM `raw_internal_monitoring.civis_production_sync_ins`
    ),

    all_workflows AS (
        SELECT

            runtime_started_at,
            parent_workflow_id,
            parent_workflow_name,
            status

        FROM `raw_internal_monitoring.civis_production_sync_ins`
        WHERE category = 'workflow'
            AND parent_workflow_name LIKE '%PROD%'
            AND DATETIME_DIFF(runtime_started_at, CURRENT_DATETIME(), DAY) <= 7
    ),

    results_per_day AS (
        SELECT

            DATE_TRUNC(runtime_started_at, DAY) AS day_run,
            parent_workflow_id,
            parent_workflow_name,
            ARRAY_AGG(status) AS statuses

        FROM all_workflows
        GROUP BY 1,2,3
    ),

    analytics AS (
        SELECT

            day_run,
            REPLACE(parent_workflow_name, '[PROD] -', '') AS parent_workflow_name,
            CASE
            WHEN 'succeeded' NOT IN UNNEST(statuses) THEN 0
            ELSE 1
            END AS succeeded

        FROM results_per_day
    )

SELECT 

    CAST(day_run AS DATE) AS day_run,
    ROUND(SUM(succeeded) / COUNT(*), 2) AS success_rate,
    STRING_AGG(CASE WHEN succeeded = 0 THEN parent_workflow_name END, '\n' ORDER BY analytics.parent_workflow_name) AS failed_

FROM analytics
GROUP BY 1
ORDER BY 1