CREATE DATABASE vehicle_task;
USE vehicle_task;

CREATE TABLE Users(
   user_id INT NOT NULL AUTO_INCREMENT,
   customer_name VARCHAR(50) NOT NULL,
   customer_address VARCHAR(150) NOT NULL,
   PRIMARY KEY ( user_id )
);

CREATE TABLE Vehicles(
    vin VARCHAR(17) NOT NULL,
    reg_number VARCHAR(6),
    car_owner_id INT,
    PRIMARY KEY ( vin ),
    FOREIGN KEY (car_owner_id) REFERENCES Users(user_id)
);

INSERT INTO Users(customer_name, customer_address)
VALUES 
('Kalles Grustransporter AB', 'Cementvägen 8, 111 11 Södertälje'),
('Johans Bulk AB', 'Balkvägen 12, 222 22 Stockholm'),
('Haralds Värdetransporter AB', 'Budgetvägen 1, 333 33 Uppsala');

INSERT INTO Vehicles(vin, reg_number, car_owner_id)
VALUES
('YS2R4X20005399401', 'ABC123', 
    (
        SELECT user_id FROM Users WHERE
        customer_name = 'Kalles Grustransporter AB'
        AND customer_address = 'Cementvägen 8, 111 11 Södertälje'
    )
),
('VLUR4X20009093588', 'DEF456', 
    (
        SELECT user_id FROM Users WHERE
        customer_name = 'Kalles Grustransporter AB'
        AND customer_address = 'Cementvägen 8, 111 11 Södertälje'
    )
),
('VLUR4X20009048066', 'GHI789', 
    (
        SELECT user_id FROM Users WHERE
        customer_name = 'Kalles Grustransporter AB'
        AND customer_address = 'Cementvägen 8, 111 11 Södertälje'
    )
),

('YS2R4X20005388011', 'JKL012', 
    (
        SELECT user_id FROM Users WHERE
        customer_name = 'Johans Bulk AB'
        AND customer_address = 'Balkvägen 12, 222 22 Stockholm'
    )
),
('YS2R4X20005387949', 'MNO345', 
    (
        SELECT user_id FROM Users WHERE
        customer_name = 'Johans Bulk AB'
        AND customer_address = 'Balkvägen 12, 222 22 Stockholm'
    )
),

('YS2R4X20005387765', 'PQR678', 
    (
        SELECT user_id FROM Users WHERE
        customer_name = 'Haralds Värdetransporter AB'
        AND customer_address = 'Budgetvägen 1, 333 33 Uppsala'
    )
),
('YS2R4X20005387055', 'STU901', 
    (
        SELECT user_id FROM Users WHERE
        customer_name = 'Haralds Värdetransporter AB'
        AND customer_address = 'Budgetvägen 1, 333 33 Uppsala'    )
);