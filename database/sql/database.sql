create table todo_list
(
  id serial primary key not null,
  content text not null,
  created_at timestamptz not null DEFAULT NOW(),
  updated_at timestamptz not null DEFAULT NOW()
);
