-- CREATE TABLE `full-archetype`.`book` (
--   `bookId` INT NOT NULL AUTO_INCREMENT,
--   `title` VARCHAR(255) NOT NULL,
--   `pageCount` INT NULL,
--   PRIMARY KEY (`bookId`));
  
-- INSERT INTO `full-archetype`.`book` (`title`, `pageCount`) VALUES ('test', '11');
-- INSERT INTO `full-archetype`.`book` (`title`) VALUES ('autre');

CREATE TABLE `message`(
    `messageId` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `first_name` VARCHAR (255) NOT NULL,
    `city` VARCHAR (255) NOT NULL,
    `object` VARCHAR (250) NOT NULL,
    `text` VARCHAR (1000) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
	`updated_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
    )ENGINE=INNODB;

CREATE TABLE `user`(
    `userId` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `message_id` INT UNSIGNED NOT NULL,
    `first_name` VARCHAR (255) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    `updated_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    KEY `message_id` (`message_id`)
    )ENGINE=INNODB;

ALTER TABLE `user` ADD CONSTRAINT `fk_message_id`
FOREIGN KEY (`message_id`) REFERENCES `message`(`messageId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE TABLE `contact`(
    `contactId` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`first_name` VARCHAR (255) NOT NULL,
	`last_name` VARCHAR (255) NOT NULL,
	`comments` VARCHAR (500) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp()
    )ENGINE=INNODB;
