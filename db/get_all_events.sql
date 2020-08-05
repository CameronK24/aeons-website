select distinct u.user_id, u.name, u.avatar, e.event_id, e.event_title, e.event_date, e.event_time, e.event_timezone, e.event_details
from event e
join users u on e.user_id = u.user_id
order by e.event_date asc, e.event_time asc;