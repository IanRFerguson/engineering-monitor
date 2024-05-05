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
  	),

	current_status AS (
    	SELECT
    
        	parent_workflow_id,
        	parent_workflow_name,
        	status,
        	MAX(runtime_started_at) AS last_monitored

    	FROM all_workflows
    	WHERE runtime_started_at = (SELECT runtime FROM last_monitored)
    	GROUP BY 1,2,3
 	 ),

	task_status AS (
    	SELECT
        
        	parent_workflow_id,
        	parent_workflow_name,
        	STRING_AGG(LOWER(name), ', ') AS failed_tasks
    
    	FROM `raw_internal_monitoring.civis_production_sync_ins`
    	WHERE category = 'task'
      		AND runtime_started_at = (SELECT runtime FROM last_monitored)
    	GROUP BY 1,2
  )

SELECT
  
	parent_workflow_id,
  	REPLACE(parent_workflow_name, '[PROD] -', '') AS parent_workflow_name,
  	status,
  	last_monitored,
  	failed_tasks
   
FROM current_status
LEFT JOIN task_status
	USING(parent_workflow_id, parent_workflow_name)