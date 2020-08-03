select distinct u.user_id, u.name, u.avatar, p.post_id, p.post_date, p.post_title, p.post_image, p.post_content
from post p
join users u on p.user_id = u.user_id;