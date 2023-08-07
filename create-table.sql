USE lokkeroom;

DROP TABLE IF EXISTS user_message_lobby;
DROP TABLE IF EXISTS user_lobby;
DROP TABLE IF EXISTS lobby;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
  id INT(11) NOT NULL AUTO_INCREMENT,
  role_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO roles(role_name) VALUES
('regular_user'),
('coach');

CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(8) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY (email)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO users(first_name, last_name, email, password) VALUES
('Daniel', 'Cardoso', 'daniel@teste.com', '12345abc'), 
('Glaucielle', 'Sa', 'glaucielle@teste.com', '12345abc'),
('Maria', 'Sa', 'maria@teste.com', '12345abc'),
('Alfredo', 'Sa', 'alfredo@teste.com', '12345abc'),
('Marta', 'Sa', 'marta@teste.com', '12345abc'),
('Valeria', 'Sa', 'valeria@teste.com', '12345abc'),
('Jose', 'Sa', 'jose@teste.com', '12345abc'),
('Joelso', 'Sa', 'joelso@teste.com', '12345abc');

CREATE TABLE lobby (
  id INT(11) NOT NULL AUTO_INCREMENT,
  lobby_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO lobby(lobby_name) VALUES
('lobby1'), 
('lobby2');

CREATE TABLE user_lobby (
  id INT(11) NOT NULL AUTO_INCREMENT,
  user_id INT,
  lobby_id INT,
  role_id INT,
  PRIMARY KEY (id),
  
  CONSTRAINT fk_role_id FOREIGN KEY (role_id)
    REFERENCES roles(id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) 
    REFERENCES users(id),
  CONSTRAINT fk_lobby_id FOREIGN KEY (lobby_id) 
    REFERENCES lobby(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO user_lobby (user_id, lobby_id, role_id) VALUES
(1, 2, 1),
(2, 2, 1),
(3, 2, 1),
(4, 2, 2),
(5, 2, 1),
(6, 2, 1),
(7, 2, 1),
(8, 1, 1),
(3, 1, 1),
(4, 1, 1),
(5, 1, 1);

CREATE TABLE user_message_lobby (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sender_user_id INT,
  target_lobby_id INT,
  message TEXT,
  create_date DATETIME,
  PRIMARY KEY (id),
  CONSTRAINT fk_sender_user_id FOREIGN KEY (sender_user_id) 
    REFERENCES users(id),
  CONSTRAINT fk_target_lobby_id FOREIGN KEY (target_lobby_id) 
    REFERENCES lobby(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO user_message_lobby (sender_user_id, target_lobby_id, message, create_date) VALUES
(1, 2, 'blalbablalbldlablallallbalbbaab', '2023-07-07 00:00:00'),
(2, 1, 'jaksjiwrliahdhajhcfajhbfdshjsa', '2023-07-07 00:00:00'),
(1, 1, 'mcaooweaoijcxniajrksdncdaiofhaw', '2023-07-07 00:00:00'),
(1, 2, 'akpewojakerhicdilaruabuc', '2023-07-07 00:00:00'),
(1, 2, 'ajklsjeardnasklhrnewkjhaudnbusdh', '2023-07-07 00:00:00');
