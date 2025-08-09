-- Catégories
insert into categories (name, sort) values ('Burgers', 1), ('Accompagnements', 2), ('Boissons', 3);

-- Produits
insert into menu_items (category_id, name, description, price_cents, image_url, sort)
select id, 'Burger Lily Classic', 'Steak, cheddar, salade, tomate, sauce maison', 950, '/logo.png', 1 from categories where name='Burgers';
insert into menu_items (category_id, name, description, price_cents, sort)
select id, 'Burger Poulet Crispy', 'Poulet pané, cheddar, salade, pickles, mayo épicée', 1050, 2 from categories where name='Burgers';
insert into menu_items (category_id, name, description, price_cents, sort)
select id, 'Frites Maison', 'Pommes de terre locales croustillantes', 350, 1 from categories where name='Accompagnements';
insert into menu_items (category_id, name, description, price_cents, sort)
select id, 'Soda Canette', '33cl', 250, 1 from categories where name='Boissons';

-- Options pour Burger Classic
with mi as (
  select id from menu_items where name='Burger Lily Classic' limit 1
)
insert into option_groups (menu_item_id, name, min_select, max_select)
select mi.id, 'Fromage', 0, 2 from mi;

with grp as (
  select id from option_groups where name='Fromage'
)
insert into options (group_id, name, price_delta_cents)
select id, 'Cheddar supplémentaire', 100 from grp;
insert into options (group_id, name, price_delta_cents)
select id, 'Raclette', 150 from grp;

-- Autre groupe : Sauces
with mi as (
  select id from menu_items where name='Burger Lily Classic' limit 1
)
insert into option_groups (menu_item_id, name, min_select, max_select)
select mi.id, 'Sauces', 0, 2 from mi;

with grp as (select id from option_groups where name='Sauces')
insert into options (group_id, name, price_delta_cents)
select id, 'Sauce maison', 0 from grp;
insert into options (group_id, name, price_delta_cents)
select id, 'Barbecue', 0 from grp;
insert into options (group_id, name, price_delta_cents)
select id, 'Pimentée', 0 from grp;
