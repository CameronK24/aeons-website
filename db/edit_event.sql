update event
set event_title = $2, event_date = $3, event_time = $4, event_timezone = $5, event_details = $6
where event_id = $1;