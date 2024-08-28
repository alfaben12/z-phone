CREATE TABLE `zp_users` (
  `citizenid` varchar(20) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_seen` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `avatar` varchar(255) NOT NULL DEFAULT 'https://github.com/alfaben12/kmrp-assets/blob/main/phone/default_avatar.jpg?raw=true',
  PRIMARY KEY (`citizenid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `zp_users` VALUES ('citizen001','123-456-7890','2024-08-28 09:03:10','2024-08-28 10:27:46','https://github.com/alfaben12/kmrp-assets/blob/main/phone/default_avatar.jpg?raw=true'),('citizen002','234-567-8901','2024-08-28 09:03:10','2024-08-28 10:27:46','https://github.com/alfaben12/kmrp-assets/blob/main/phone/default_avatar.jpg?raw=true'),('citizen003','345-678-9012','2024-08-28 09:03:10','2024-08-28 10:27:46','https://github.com/alfaben12/kmrp-assets/blob/main/phone/default_avatar.jpg?raw=true');

CREATE TABLE `zp_ads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `media` varchar(255)  NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `zp_contacts` (
  `contactid` int NOT NULL AUTO_INCREMENT,
  `citizenid` varchar(20)  NOT NULL,
  `contact_citizenid` varchar(20) NOT NULL,
  `contact_name` varchar(100)  NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`contactid`),
  UNIQUE KEY `unique_contact` (`citizenid`,`contact_citizenid`),
  KEY `contact_citizenid` (`contact_citizenid`),
  CONSTRAINT `zp_contacts_ibfk_1` FOREIGN KEY (`citizenid`) REFERENCES `zp_users` (`citizenid`),
  CONSTRAINT `zp_contacts_ibfk_2` FOREIGN KEY (`contact_citizenid`) REFERENCES `zp_users` (`citizenid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `zp_conversations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `is_group` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
INSERT INTO `zp_conversations` VALUES (1,'General Chat',0,'2024-08-28 09:03:10','2024-08-28 09:03:10'),(2,'Project Team',1,'2024-08-28 09:03:10','2024-08-28 09:03:10'),(3,'Friends',1,'2024-08-28 09:03:10','2024-08-28 09:03:10');

CREATE TABLE `zp_conversation_messages` (
  `messageid` int NOT NULL AUTO_INCREMENT,
  `conversationid` int NOT NULL,
  `sender_citizenid` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `media` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`messageid`),
  KEY `idx_conversationid` (`conversationid`),
  KEY `idx_sender_citizenid` (`sender_citizenid`),
  CONSTRAINT `zp_conversation_messages_ibfk_1` FOREIGN KEY (`conversationid`) REFERENCES `zp_conversations` (`id`),
  CONSTRAINT `zp_conversation_messages_ibfk_2` FOREIGN KEY (`sender_citizenid`) REFERENCES `zp_users` (`citizenid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

INSERT INTO `zp_conversation_messages` VALUES (1,1,'citizen001','Hello, everyone!',NULL,'2024-08-28 09:03:10'),(2,1,'citizen002','Hi there!',NULL,'2024-08-28 09:03:10'),(3,2,'citizen001','Project update meeting at 3 PM.',NULL,'2024-08-28 09:03:10'),(4,2,'citizen003','Got it, see you then.',NULL,'2024-08-28 09:03:10'),(5,3,'citizen002','Let’s hang out this weekend!',NULL,'2024-08-28 09:03:10'),(6,3,'citizen003','Sounds good!',NULL,'2024-08-28 09:03:10'),(7,1,'citizen001','Welcome to the General Chat!',NULL,'2024-08-28 09:03:20'),(8,1,'citizen002','Thanks! Excited to be here.',NULL,'2024-08-28 09:03:20'),(9,1,'citizen003','Hey everyone, what’s up?',NULL,'2024-08-28 09:03:20'),(10,1,'citizen001','Just catching up. Any plans for the weekend?',NULL,'2024-08-28 09:03:20'),(11,1,'citizen002','I’m thinking of going hiking. Anyone interested?',NULL,'2024-08-28 09:03:20'),(12,2,'citizen001','Can someone please review the latest project draft?',NULL,'2024-08-28 09:03:20'),(13,2,'citizen003','I’ll take a look and provide feedback by EOD.',NULL,'2024-08-28 09:03:20'),(14,2,'citizen001','Great, thanks! Let’s aim to finalize it by tomorrow.',NULL,'2024-08-28 09:03:20'),(15,2,'citizen003','Sounds good. I’ll make sure to review thoroughly.',NULL,'2024-08-28 09:03:20'),(16,3,'citizen002','Hey, let’s plan a game night this Saturday.',NULL,'2024-08-28 09:03:20'),(17,3,'citizen003','I’m in! What games should we play?',NULL,'2024-08-28 09:03:20'),(18,3,'citizen002','How about some board games and a few rounds of cards?',NULL,'2024-08-28 09:03:20'),(19,3,'citizen003','Perfect! I’ll bring some snacks.',NULL,'2024-08-28 09:03:20'),(20,3,'citizen001','Count me in for the game night!',NULL,'2024-08-28 09:03:20'),(21,3,'citizen002','Looking forward to it. Let’s finalize the details soon.',NULL,'2024-08-28 09:03:20'),(22,3,'citizen003','I can host at my place. Does that work for everyone?',NULL,'2024-08-28 09:03:20'),(23,3,'citizen001','Yes, that works. Thanks for hosting!',NULL,'2024-08-28 09:03:20'),(24,3,'citizen002','Great! I’ll bring some drinks.',NULL,'2024-08-28 09:03:20');

CREATE TABLE `zp_conversation_participants` (
  `conversationid` int NOT NULL,
  `citizenid` varchar(20) NOT NULL,
  `join_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`conversationid`,`citizenid`),
  KEY `citizenid` (`citizenid`),
  KEY `idx_conversationid_citizenid` (`conversationid`,`citizenid`),
  CONSTRAINT `zp_conversation_participants_ibfk_1` FOREIGN KEY (`conversationid`) REFERENCES `zp_conversations` (`id`),
  CONSTRAINT `zp_conversation_participants_ibfk_2` FOREIGN KEY (`citizenid`) REFERENCES `zp_users` (`citizenid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `zp_conversation_participants` VALUES (1,'citizen001','2024-08-28 09:03:10'),(1,'citizen002','2024-08-28 09:03:10'),(2,'citizen001','2024-08-28 09:03:10'),(2,'citizen003','2024-08-28 09:03:10'),(3,'citizen002','2024-08-28 09:03:10'),(3,'citizen003','2024-08-28 09:03:10');


CREATE TABLE `zp_tweet_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tweetid` int NOT NULL,
  `citizenid` varchar(20)  NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tweetid` (`tweetid`),
  CONSTRAINT `zp_tweet_comments_ibfk_1` FOREIGN KEY (`tweetid`) REFERENCES `zp_tweets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `zp_tweets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `citizenid` varchar(20)  NOT NULL,
  `tweet` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;