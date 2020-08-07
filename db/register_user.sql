insert into users
(email, password, name, avatar, portrait, character_id)
values
($1, $2, $3, $4, $5, $6)
returning *;