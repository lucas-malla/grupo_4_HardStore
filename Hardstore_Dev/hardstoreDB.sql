-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(45) NULL,
  `model` VARCHAR(45) NULL,
  `color` VARCHAR(45) NULL,
  `price` INT NULL,
  `discount` INT NULL,
  `stock` INT NULL,
  `product_name` VARCHAR(45) NULL,
  `selection` INT NULL,
  `description` VARCHAR(500) NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `fk_product_category1_idx` (`category_id` ASC) ,
  CONSTRAINT `fk_product_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `mydb`.`category` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `cellphone` VARCHAR(45) NULL,
  `street` VARCHAR(45) NULL,
  `street_number` VARCHAR(45) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `avatar` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`cart_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cart_product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `quantity` INT NULL,
  INDEX `fk_cart_product_product1_idx` (`product_id` ASC) ,
  INDEX `fk_cart_product_user1_idx` (`user_id` ASC) ,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cart_product_id_UNIQUE` (`id` ASC) ,
  CONSTRAINT `fk_cart_product_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `mydb`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cart_product_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`order` (
  `order_id` INT NOT NULL,
  `state` VARCHAR(45) NULL,
  `created_at` VARCHAR(45) NULL,
  `updated_at` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `fk_order_user1_idx` (`user_id` ASC) ,
  UNIQUE INDEX `order_id_UNIQUE` (`order_id` ASC) ,
  CONSTRAINT `fk_order_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`order_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`order_product` (
  `product_id` INT NOT NULL,
  `order_id` INT NOT NULL,
  `quantity` INT NULL,
  INDEX `fk_order_product_product1_idx` (`product_id` ASC) ,
  INDEX `fk_order_product_orders1_idx` (`order_id` ASC) ,
  CONSTRAINT `fk_order_product_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `mydb`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_product_orders1`
    FOREIGN KEY (`order_id`)
    REFERENCES `mydb`.`order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`product-images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`product-images` (
  `image_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `image_name` VARCHAR(100) NULL,
  `img_number` INT NULL,
  PRIMARY KEY (`image_id`),
  INDEX `fk_product-images_product1_idx` (`product_id` ASC) ,
  CONSTRAINT `fk_product-images_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `mydb`.`product` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
