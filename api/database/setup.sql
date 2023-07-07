ALTER TABLE IF EXISTS addresses_florin DROP CONSTRAINT IF EXISTS addresses_florin_zone_id_fkey;
ALTER TABLE IF EXISTS user_account DROP CONSTRAINT IF EXISTS user_account_address_id_fkey;
ALTER TABLE IF EXISTS collect_days DROP CONSTRAINT IF EXISTS collect_days_bin_type_id_fkey;
ALTER TABLE IF EXISTS collect_days DROP CONSTRAINT IF EXISTS collect_days_weekday_id_fkey;
ALTER TABLE IF EXISTS collect_days DROP CONSTRAINT IF EXISTS collect_days_zone_id_fkey;
ALTER TABLE IF EXISTS recycling_object DROP CONSTRAINT IF EXISTS recycling_object_bin_type_id_fkey;
ALTER TABLE IF EXISTS recycling_object DROP CONSTRAINT IF EXISTS recycling_object_material_type_id_fkey;
ALTER TABLE IF EXISTS appointments DROP CONSTRAINT IF EXISTS appointments_user_id_fkey;
ALTER TABLE IF EXISTS appointments DROP CONSTRAINT IF EXISTS appointments_weekday_id_fkey;

DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS recycling_object;
DROP TABLE IF EXISTS materials_type; 
DROP TABLE IF EXISTS collect_days;
DROP TABLE IF EXISTS collect_bulky_waste;
DROP TABLE IF EXISTS weekdays;
DROP TABLE IF EXISTS bin_types;
DROP TABLE IF EXISTS address_zones;
DROP TABLE IF EXISTS addresses_florin;

CREATE TABLE weekdays (
    weekday_id INT GENERATED ALWAYS AS IDENTITY,
    weekday VARCHAR UNIQUE NOT NULL,
    PRIMARY KEY (weekday_id)
);

CREATE TABLE address_zones (
    zone_id INT GENERATED ALWAYS AS IDENTITY,
    zone_number INT NOT NULL,
    PRIMARY KEY(zone_id)
);

CREATE TABLE addresses_florin (
    address_id INT GENERATED ALWAYS AS IDENTITY,
    street_name VARCHAR NOT NULL,
    house_number INT NOT NULL,
    postcode VARCHAR NOT NULL,
    zone_id INT NOT NULL,
    PRIMARY KEY (address_id),
    FOREIGN KEY (zone_id) REFERENCES address_zones(zone_id)
);

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    points INT DEFAULT 0 NOT NULL,
    address_id INT,
    isAdmin BOOLEAN DEFAULT FALSE NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (address_id) REFERENCES addresses_florin(address_id) ON DELETE RESTRICT
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id) ON DELETE RESTRICT
);

CREATE TABLE bin_types (
    bin_type_id INT GENERATED ALWAYS AS IDENTITY,
    bin_type_name VARCHAR UNIQUE NOT NULL, 
    PRIMARY KEY (bin_type_id)
);

CREATE TABLE materials_type (
    material_type_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR UNIQUE NOT NULL,
    PRIMARY KEY (material_type_id)
);

CREATE TABLE collect_days (
    collect_day_id INT GENERATED ALWAYS AS IDENTITY,
    bin_type_id INT NOT NULL,
    weekday_id INT NOT NULL,
    zone_id INT NOT NULL,
    PRIMARY KEY (collect_day_id),
    FOREIGN KEY (bin_type_id) REFERENCES bin_types(bin_type_id ),
    FOREIGN KEY (weekday_id) REFERENCES weekdays(weekday_id),
    FOREIGN KEY (zone_id) REFERENCES address_zones(zone_id) 
);

CREATE TABLE recycling_object (
    object_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    material_type_id INT NOT NULL,
    bin_type_id INT NOT NULL,
    PRIMARY KEY (object_id),
    FOREIGN KEY (bin_type_id) REFERENCES bin_types(bin_type_id),
    FOREIGN KEY (material_type_id) REFERENCES materials_type(material_type_id)  
);

CREATE TABLE collect_bulky_waste(
    bulky_waste_id INT GENERATED ALWAYS AS IDENTITY,
    weight_kg INT NOT NULL, 
    price INT NOT NULL,  
    PRIMARY KEY (bulky_waste_id)
);

CREATE TABLE appointments (
    appointment_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    object_name VARCHAR NOT NULL,
    weight_kg INT NOT NULL,
    weekday_id INT NOT NULL,
    PRIMARY KEY (appointment_id),
    FOREIGN KEY (weekday_id) REFERENCES weekdays(weekday_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)

);

INSERT INTO weekdays (weekday)
VALUES ('UNDEFINED'), ('Sunday'), ('Monday'), ('Tuesday'), ('Wednesday'), ('Thursday'), ('Friday'), ('Saturday');

INSERT INTO bin_types (bin_type_name) VALUES ('UNDEFINED'), ('General Waste'), ('Recycling'), ('Food Waste'), ('Garden Waste'), ('Clear bag'), ('Large Supermarkets'), ('Needs Collection');

INSERT INTO materials_type (name) VALUES
('UNDEFINED'), ('Plastic'), ('Paper'), ('Glass'), ('Metal'), ('Small Electronics'), ('Food'), ('Textiles'), ('Batteries'), ('Garden'), ('Bulky waste');

INSERT INTO recycling_object (name, material_type_id, bin_type_id) VALUES
('Plastic water bottle', 2, 3),
('Plastic food container', 2, 3),
('Plastic laundry detergent bottle', 2, 3),
('Plastic shampoo bottle', 2, 3),
('Plastic soda bottle', 2, 3),
('Plastic coffee cup lid', 2, 3),
('Plastic straw', 2, 3),
('Plastic toy', 2, 3),
('Newspaper', 3, 3),
('Cardboard box', 3, 3),
('Office paper', 3, 3),
('Paper grocery bag', 3, 3),
('Magazine', 3, 3),
('Paper envelope', 3, 3),
('Cardboard packaging', 3, 3),
('Paper towel', 3, 3),
('Wrapping paper', 3, 3),
('Paperback book', 3, 3),
('Cardboard shipping box', 3, 3),
('Cardboard cereal box', 3, 3),
('Cardboard pizza box', 3, 3),
('Cardboard drink carrier', 3, 3),
('Cardboard tube', 3, 3),
('Cardboard file folder', 3, 3),
('Cardboard shoebox', 3, 3),
('Cardboard appliance box', 3, 3),
('Cardboard egg carton', 3, 3),
('Cardboard packaging materials', 3, 3),
('Glass bottle', 4, 3),
('Glass jar', 4, 3),
('Drinking glass', 4, 3),
('Glass food container', 4, 3),
('Glass perfume bottle', 4, 3),
('Glass vase', 4, 3),
('Glass candle holder', 4, 3),
('Glass picture frame', 4, 3),
('Glass ashtray', 4, 3),
('Glass window pane', 4, 3),
('Aluminum soda can', 5, 3),
('Tin food can', 5, 3),
('Aluminum foil', 5, 3),
('Metal hanger', 5, 3),
('Metal cooking pot', 5, 3),
('Metal utensils', 5, 3),
('Metal wire', 5, 3),
('Metal door handle', 5, 3),
('Metal key', 5, 3),
('Metal nail', 2, 3),
('Mobile phone', 6, 8),
('Laptop computer', 6, 8),
('Television', 6, 8),
('Digital camera', 6, 8),
('Printer', 6, 8),
('Video game console', 6, 8),
('DVD player', 6, 8),
('MP3 player', 6, 8),
('Computer monitor', 6, 8),
('Electronic tablet', 6, 8),
('Fruit peelings', 7, 4),
('Vegetable scraps', 7, 4),
('Eggshells', 7, 4),
('Coffee grounds', 7, 4),
('Tea bags', 7, 4),
('Bread crusts', 7, 4),
('Pasta leftovers', 7, 4),
('Rice leftovers', 7, 4),
('Meat bones', 7, 4),
('T-shirt', 8, 6),
('Jeans', 8, 6),
('Dress', 8, 6),
('Socks', 8, 6),
('Sweater', 8, 6),
('Towel', 8, 6),
('Bedsheet', 8, 6),
('Curtains', 8, 6),
('Pillowcase', 8, 6),
('Tablecloth', 8, 6),
('AA batteries', 9, 6),
('AAA batteries', 9, 6),
('Button cell batteries', 9, 6),
('Rechargeable batteries', 9, 6),
('Laptop battery', 9, 6),
('Watch battery', 9, 6),
('Camera battery', 9, 6),
('Remote control battery', 9, 6),
('Hearing aid battery', 9, 6),
('Grass clippings', 10, 5),
('Leaves', 10, 5),
('Tree branches', 10, 5),
('Plant trimmings', 10, 5),
('Weed clippings', 10, 5),
('Flower bouquets', 10, 5),
('Garden soil', 10, 5),
('Mulch', 10, 5),
('Compost', 10, 5),
('Potted plants', 10, 5),
('Plastic grocery bags', 2, 7),
('Plastic bread bags', 2, 7),
('Plastic food wrappers', 2, 7),
('Plastic packaging film', 2, 7),
('Plastic bubble wrap', 2, 2),
('Plastic ziplock bags', 2, 7),
('Plastic shrink wrap', 2, 7),
('Plastic cereal bag liners', 2, 7),
('Plastic produce bags', 2, 7),
('Metal coat hangers', 5, 2),
('Kitchen knives', 5, 2),
('Kitchen fork', 5, 2),
('Kitchen spoon', 5, 2),
('Pots and pans', 5, 2),
('Window panes', 4, 2),
('Glass cookware or Pyrex', 4, 2),
('Spectacle lenses', 4, 2),
('Broken drinks glasses', 4, 2),
('Kitchen roll', 3, 2),
('Tissues', 3, 2),
('Toilet paper', 3, 2),
('Black bags', 2, 2),
('Plastic coat hangers', 2, 2),
('Plastic lunch boxes', 2, 2),
('Plastic children’s toys', 2, 2),
('Polystyrene', 2, 2),
('Cling film', 2, 7),
('Crisp packets', 2, 7),
('Fruit bags', 2, 7),
('Veg bags', 2, 7),
('Salad bags', 2, 7),
('Sweet wrappers', 2, 7),
('Bread bags', 2, 7),
('Plastic bags', 2, 7),
('Pet food pouches', 2, 7),
('Baby food pouches', 2, 7),
('Dog food pouches', 2, 7),
('Cat food pouches', 2, 7),
('Cleaning product bottles', 2, 3),
('Beauty product bottles', 2, 3),
('Drinks bottles (and tops)', 2, 3),
('Food cartons', 2, 3),
('Drink cartons', 2, 3),
('Food trays (including black trays)', 2, 3),
('Ice cream tubs', 2, 3),
('Large sweet tubs', 2, 3),
('Margarine tubs', 2, 3),
('Plastic milk cartons', 2, 3),
('Plastic milk bottles', 2, 3),
('Yoghurt pots', 2, 3),
('Carrier bags', 2, 3),
('Books', 3, 3),
('Catalogues', 3, 3),
('Phone directories', 3, 3),
('Cereal boxes', 3, 3),
('Cardboard and cardboard boxes', 3, 3),
('Envelopes', 3, 3),
('Greeting cards (no glitter)', 3, 3),
('Junk mail', 3, 3),
('Shredded paper', 3, 3),
('Tissue boxes', 3, 3),
('Toilet roll tubes', 3, 3),
('Writing paper', 3, 3),
('Aerosols', 5, 3),
('Clean foil', 5, 3),
('Food tins', 5, 3),
('Food cans', 5, 3),
('Pet food tins', 5, 3),
('Pet food cans', 5, 3),
('Steel food cans', 5, 3),
('Aluminium food cans', 5, 3),
('Steel drink cans', 5, 3),
('Aluminium drink cans', 5, 3),
('Metal bottle lids', 5, 3),
('Metal jar lids', 5, 3);

INSERT INTO collect_bulky_waste (price, weight_kg) VALUES
(100, 101), (50,100), (30,60), (15,30);

INSERT INTO address_zones(zone_number) VALUES
(0), (1), (2), (3), (4), (5), (6), (7), (8), (9), (10);

INSERT INTO addresses_florin (street_name, house_number, postcode, zone_id)
VALUES

('Apple Street', '1', 'GL1 1AB', 1),
('Apple Street', '2', 'GL1 1AB', 1),
('Apple Street', '3', 'GL1 1AB', 1),
('Apple Street', '4', 'GL1 1AB', 1),
('Cherry Lane', '10', 'GL2 2CD', 1),
('Cherry Lane', '12', 'GL2 2CD', 1),
('Cherry Lane', '14', 'GL2 2CD', 1),
('Orange Avenue', '20', 'GL3 3EF', 1),
('Orange Avenue', '21', 'GL3 3EF', 1),
('Orange Avenue', '23', 'GL3 3EF', 1),
('Orange Avenue', '25', 'GL3 3EF', 1),
('Orange Avenue', '27', 'GL3 3EF', 1),
('Orange Avenue', '28', 'GL3 3EF', 1),
('Pear Road', '30', 'GL4 4GH', 1),
('Pear Road', '32', 'GL4 4GH', 1),
('Pear Road', '34', 'GL4 4GH', 1),
('Pear Road', '36', 'GL4 4GH', 1),
('Pear Road', '37', 'GL4 4GH', 1),
('Pear Road', '38', 'GL4 4GH', 1),
('Pear Road', '40', 'GL4 4GH', 1),
('Blue Sky Boulevard', '50', 'GL5 5IJ', 2),
('Blue Sky Boulevard', '51', 'GL5 5IJ', 2),
('Blue Sky Boulevard', '52', 'GL5 5IJ', 2),
('Blue Sky Boulevard', '54', 'GL5 5IJ', 2),
('Blue Sky Boulevard', '55', 'GL5 5IJ', 2),
('Starry Lane', '60', 'GL6 6KL', 2),
('Starry Lane', '62', 'GL6 6KL', 2),
('Starry Lane', '64', 'GL6 6KL', 2),
('Starry Lane', '65', 'GL6 6KL', 2),
('Starry Lane', '67', 'GL6 6KL', 2),
('Starry Lane', '68', 'GL6 6KL', 2),
('Starry Lane', '69', 'GL6 6KL', 2),
('Galaxy Street', '70', 'GL7 7MN', 2),
('Galaxy Street', '71', 'GL7 7MN', 2),
('Galaxy Street', '73', 'GL7 7MN', 2),
('Galaxy Street', '74', 'GL7 7MN', 2),
('Galaxy Street', '76', 'GL7 7MN', 2),
('Mountain View Road', '80', 'GL8 8OP',3),
('Mountain View Road', '82', 'GL8 8OP',3),
('Mountain View Road', '83', 'GL8 8OP',3),
('Mountain View Road', '85', 'GL8 8OP',3),
('Mountain View Road', '86', 'GL8 8OP',3),
('Mountain View Road', '88', 'GL8 8OP',3),
('Sunset Avenue', '90', 'GL9 9QR',3),
('Sunset Avenue', '92', 'GL9 9QR',3),
('Sunset Avenue', '94', 'GL9 9QR',3),
('Sunset Avenue', '95', 'GL9 9QR',3),
('Sunset Avenue', '97', 'GL9 9QR',3),
('Sunset Avenue', '98', 'GL9 9QR',3),
('Sunset Avenue', '100', 'GL9 9QR',3),
('Sunset Avenue', '101', 'GL9 9QR',3),
('Sunset Avenue', '103', 'GL9 9QR', 4),
('Sunset Avenue', '104', 'GL9 9QR', 4),
('Sunset Avenue', '106', 'GL9 9QR', 4),
('Sunset Avenue', '108', 'GL9 9QR', 4),
('Meadow Lane', '110', 'GL10 10ST', 4),
('Meadow Lane', '112', 'GL10 10ST', 4),
('Meadow Lane', '114', 'GL10 10ST', 4),
('Meadow Lane', '116', 'GL10 10ST', 4),
('Meadow Lane', '118', 'GL10 10ST', 4),
('Meadow Lane', '120', 'GL10 10ST', 4),
('Meadow Lane', '122', 'GL10 10ST', 4),
('Meadow Lane', '124', 'GL10 10ST', 4),
('Meadow Lane', '126', 'GL10 10ST', 4),
('Meadow Lane', '128', 'GL10 10ST', 4),
('Greenwood Drive', '130', 'GL11 11UV', 4),
('Greenwood Drive', '132', 'GL11 11UV', 4),
('Greenwood Drive', '134', 'GL11 11UV', 4),
('Greenwood Drive', '136', 'GL11 11UV', 4),
('Greenwood Drive', '138', 'GL11 11UV', 4),
('Greenwood Drive', '140', 'GL11 11UV', 4),
('Greenwood Drive', '142', 'GL11 11UV', 4),
('Greenwood Drive', '144', 'GL11 11UV', 4),
('Greenwood Drive', '146', 'GL11 11UV', 4),
('Greenwood Drive', '148', 'GL11 11UV', 4),
('Greenwood Drive', '150', 'GL11 11UV', 4),
('Greenwood Drive', '152', 'GL11 11UV', 4),
('Maple Court', '160', 'GL12 12WX', 5),
('Maple Court', '162', 'GL12 12WX', 5),
('Maple Court', '164', 'GL12 12WX', 5),
('Maple Court', '166', 'GL12 12WX', 5),
('Maple Court', '168', 'GL12 12WX', 5),
('Maple Court', '170', 'GL12 12WX', 5),
('Maple Court', '172', 'GL12 12WX', 5),
('Maple Court', '174', 'GL12 12WX', 5),
('Maple Court', '176', 'GL12 12WX', 5),
('Maple Court', '178', 'GL12 12WX', 5),
('Maple Court', '180', 'GL12 12WX', 6),
('Maple Court', '182', 'GL12 12WX', 6),
('Maple Court', '184', 'GL12 12WX', 6),
('Maple Court', '186', 'GL12 12WX', 6),
('Maple Court', '188', 'GL12 12WX', 6),
('Maple Court', '190', 'GL12 12WX', 6),
('Maple Court', '192', 'GL12 12WX', 6),
('Maple Court', '194', 'GL12 12WX', 6),
('Maple Court', '196', 'GL12 12WX', 6),
('Maple Court', '198', 'GL12 12WX', 6),
('Maple Court', '200', 'GL12 12WX', 6),
('Maple Court', '202', 'GL12 12WX', 7),
('Willow Lane', '204', 'GL13 13YZ', 7),
('Willow Lane', '206', 'GL13 13YZ', 7),
('Willow Lane', '208', 'GL13 13YZ', 7),
('Willow Lane', '210', 'GL13 13YZ', 7),
('Willow Lane', '212', 'GL13 13YZ', 7),
('Willow Lane', '214', 'GL13 13YZ', 7),
('Willow Lane', '216', 'GL13 13YZ', 7),
('Willow Lane', '218', 'GL13 13YZ', 7),
('Willow Lane', '220', 'GL13 13YZ', 7),
('Willow Lane', '222', 'GL13 13YZ', 7),
('Willow Lane', '224', 'GL13 13YZ', 8),
('Willow Lane', '226', 'GL13 13YZ', 8),
('Willow Lane', '228', 'GL13 13YZ', 8),
('Willow Lane', '230', 'GL13 13YZ', 8),
('Willow Lane', '232', 'GL13 13YZ', 8),
('Willow Lane', '234', 'GL13 13YZ', 8),
('Willow Lane', '236', 'GL13 13YZ', 8),
('Willow Lane', '238', 'GL13 13YZ', 8),
('Willow Lane', '240', 'GL13 13YZ', 8),
('Willow Lane', '242', 'GL13 13YZ', 8),
('Willow Lane', '244', 'GL13 13YZ', 9),
('Willow Lane', '246', 'GL13 13YZ', 9),
('Willow Lane', '248', 'GL13 13YZ', 9),
('Willow Lane', '250', 'GL13 13YZ', 9),
('Willow Lane', '252', 'GL13 13YZ', 9),
('Willow Lane', '254', 'GL13 13YZ', 9),
('Willow Lane', '256', 'GL13 13YZ', 9),
('Willow Lane', '258', 'GL13 13YZ', 9),
('Willow Lane', '260', 'GL13 13YZ', 9),
('Willow Lane', '262', 'GL13 13YZ', 10),
('Willow Lane', '264', 'GL13 13YZ', 10),
('Willow Lane', '266', 'GL13 13YZ', 10),
('Willow Lane', '268', 'GL13 13YZ', 10),
('Willow Lane', '270', 'GL13 13YZ', 10),
('Willow Lane', '272', 'GL13 13YZ', 10),
('Willow Lane', '274', 'GL13 13YZ', 10),
('Willow Lane', '276', 'GL13 13YZ', 10),
('Willow Lane', '278', 'GL13 13YZ', 10);

INSERT INTO user_account (username, password, isAdmin, points, address_id) VALUES
('laisjm', 'lais', true, 0, 2), ('lais', 'lais', true, 0, 3);

INSERT INTO collect_days (bin_type_id, weekday_id, zone_id) VALUES
(2, 3, 2), (3, 3, 2), (4, 3, 2), (2, 3, 3), (3, 3, 3), (4, 3, 3), (2, 3, 4), (3, 3, 4), (4, 3, 4), (2, 3, 5), (3, 3, 5), (4, 3, 5), (2, 3, 6), (3, 3, 6), (4, 3, 6), (2, 3, 7), (3, 3, 7), (4, 3, 7), (2, 3, 8), (3, 3, 8), (4, 3, 8), (2, 3, 9), (3, 3, 9), (4, 3, 9), (2, 3, 10), (3, 3, 10), (4, 3, 10);

INSERT INTO appointments (user_id, object_name, weekday_id, weight_kg) VALUES
(1, 'sofa', 2, 60);


