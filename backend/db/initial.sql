CREATE TABLE `full-archetype`.`book` (
  `bookId` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `pageCount` INT NULL,
  PRIMARY KEY (`bookId`));
  
INSERT INTO `full-archetype`.`book` (`title`, `pageCount`) VALUES ('test', '11');
INSERT INTO `full-archetype`.`book` (`title`) VALUES ('autre');
