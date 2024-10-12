/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100422 (10.4.22-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : zphone

 Target Server Type    : MySQL
 Target Server Version : 100422 (10.4.22-MariaDB)
 File Encoding         : 65001

 Date: 30/11/2024 12:40:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for zp_ads
-- ----------------------------
DROP TABLE IF EXISTS `zp_ads`;
CREATE TABLE `zp_ads`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `media` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `citizenid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for zp_calls_histories
-- ----------------------------
DROP TABLE IF EXISTS `zp_calls_histories`;
CREATE TABLE `zp_calls_histories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `citizenid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `to_citizenid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp,
  `flag` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'IN',
  `is_anonim` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `citizenid`(`citizenid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for zp_contacts
-- ----------------------------
DROP TABLE IF EXISTS `zp_contacts`;
CREATE TABLE `zp_contacts`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `citizenid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contact_citizenid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contact_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_contact`(`citizenid` ASC, `contact_citizenid` ASC) USING BTREE,
  INDEX `contact_citizenid`(`contact_citizenid` ASC) USING BTREE,
  INDEX `citizenid_contact_citizenid`(`citizenid` ASC, `contact_citizenid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for zp_contacts_requests
-- ----------------------------
DROP TABLE IF EXISTS `zp_contacts_requests`;
CREATE TABLE `zp_contacts_requests`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `citizenid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `from_citizenid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `citizenid`(`citizenid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for zp_conversation_messages
-- ----------------------------
DROP TABLE IF EXISTS `zp_conversation_messages`;
CREATE TABLE `zp_conversation_messages`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `conversationid` int NOT NULL,
  `sender_citizenid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `media` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_conversationid`(`conversationid` ASC) USING BTREE,
  INDEX `idx_sender_citizenid`(`sender_citizenid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for zp_conversation_participants
-- ----------------------------
DROP TABLE IF EXISTS `zp_conversation_participants`;
CREATE TABLE `zp_conversation_participants`  (
  `conversationid` int NOT NULL,
  `citizenid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `join_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`conversationid`, `citizenid`) USING BTREE,
  INDEX `citizenid`(`citizenid` ASC) USING BTREE,
  INDEX `idx_conversationid_citizenid`(`conversationid` ASC, `citizenid` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for zp_conversations
-- ----------------------------
DROP TABLE IF EXISTS `zp_conversations`;
CREATE TABLE `zp_conversations`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_group` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `admin_citizenid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for zp_emails
-- ----------------------------
DROP TABLE IF EXISTS `zp_emails`;
CREATE TABLE `zp_emails`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `institution` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `citizenid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `citizenid`(`citizenid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for zp_inetmax_histories
-- ----------------------------
DROP TABLE IF EXISTS `zp_inetmax_histories`;
CREATE TABLE `zp_inetmax_histories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `citizenid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `flag` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `total` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `citizenid`(`citizenid` ASC) USING BTREE,
  INDEX `citizenid_flag`(`citizenid` ASC, `flag` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for zp_loops_users
-- ----------------------------
DROP TABLE IF EXISTS `zp_loops_users`;
CREATE TABLE `zp_loops_users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `citizenid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://i.ibb.co.com/F3w0F5L/default-avatar-1.png',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fullname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://d25yuvogekh0nj.cloudfront.net/2019/08/Twitter-Banner-Size-Guide-blog-banner-1250x500.png',
  `bio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Welcome to loopsverse!',
  `is_verified` tinyint NOT NULL DEFAULT 0,
  `is_allow_message` tinyint NOT NULL DEFAULT 0,
  `join_at` datetime NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_username`(`username` ASC) USING BTREE,
  INDEX `citizenid`(`citizenid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for zp_news
-- ----------------------------
DROP TABLE IF EXISTS `zp_news`;
CREATE TABLE `zp_news`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `citizenid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `reporter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `stream` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_stream` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `is_stream`(`is_stream` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for zp_photos
-- ----------------------------
DROP TABLE IF EXISTS `zp_photos`;
CREATE TABLE `zp_photos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `citizenid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `media` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `citizenid`(`citizenid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for zp_service_messages
-- ----------------------------
DROP TABLE IF EXISTS `zp_service_messages`;
CREATE TABLE `zp_service_messages`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `citizenid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `solved_by_citizenid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `service` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp,
  `solved_reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `service`(`service` ASC) USING BTREE,
  INDEX `service_solved_by_citizenid`(`solved_by_citizenid` ASC, `service` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for zp_tweet_comments
-- ----------------------------
DROP TABLE IF EXISTS `zp_tweet_comments`;
CREATE TABLE `zp_tweet_comments`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `tweetid` int NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `loops_userid` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for zp_tweets
-- ----------------------------
DROP TABLE IF EXISTS `zp_tweets`;
CREATE TABLE `zp_tweets`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `loops_userid` int NOT NULL,
  `tweet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `media` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for zp_users
-- ----------------------------
DROP TABLE IF EXISTS `zp_users`;
CREATE TABLE `zp_users`  (
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `citizenid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `last_seen` timestamp NOT NULL DEFAULT current_timestamp,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://i.ibb.co.com/F3w0F5L/default-avatar-1.png',
  `unread_message_service` int NOT NULL DEFAULT 0,
  `unread_message` int NOT NULL DEFAULT 0,
  `wallpaper` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://i.ibb.co.com/pftZvpY/peakpx-1.jpg',
  `is_anonim` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `is_donot_disturb` tinyint(1) NOT NULL DEFAULT 0,
  `frame` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1.svg',
  `iban` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `active_loops_userid` int NOT NULL DEFAULT 0,
  `inetmax_balance` int NOT NULL DEFAULT 5000000,
  `phone_height` float NOT NULL DEFAULT 610,
  PRIMARY KEY (`citizenid`) USING BTREE,
  INDEX `citizenid`(`citizenid` ASC) USING BTREE,
  INDEX `phone_number`(`phone_number` ASC) USING BTREE,
  INDEX `active_loops_userid`(`active_loops_userid` ASC) USING BTREE,
  INDEX `iban`(`iban` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
