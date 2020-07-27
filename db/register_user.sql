insert into users
(email, password, name, avatar, portrait)
values
($1, $2, $3, $4, $5)
returning *;