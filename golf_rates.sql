/*
 Navicat Premium Dump SQL

 Source Server         : golf
 Source Server Type    : MySQL
 Source Server Version : 50743 (5.7.43-log)
 Source Host           : 103.150.116.24:3306
 Source Schema         : golf

 Target Server Type    : MySQL
 Target Server Version : 50743 (5.7.43-log)
 File Encoding         : 65001

 Date: 14/04/2025 21:56:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for golf_rates
-- ----------------------------
DROP TABLE IF EXISTS `golf_rates`;
CREATE TABLE `golf_rates`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `golf_course` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nationality` enum('Malaysian','Non-Malaysian') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `week_day` int(11) NULL DEFAULT NULL,
  `week_day_visitor` int(11) NULL DEFAULT NULL,
  `weekend_public_holiday` int(11) NULL DEFAULT NULL,
  `weekend_public_holiday_visitor` int(11) NULL DEFAULT NULL,
  `weekend_saturday_afternoon` int(11) NULL DEFAULT NULL,
  `weekend_saturday_afternoon_visitor` int(11) NULL DEFAULT NULL,
  `weekend_sunday_afternoon` int(11) NULL DEFAULT NULL,
  `weekend_sunday_afternoon_visitor` int(11) NULL DEFAULT NULL,
  `remarks` enum('Agent Rates','Published Rates','N/A') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N/A',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `active_status_id` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of golf_rates
-- ----------------------------
INSERT INTO `golf_rates` VALUES (1, 'Le Grandeur', 'Palm Resort', 'Malaysian', 130, 170, 225, 340, 205, 295, 165, 295, 'Agent Rates', '2025-04-14 20:31:57', NULL, '2025-04-14 20:36:51', NULL, '1');
INSERT INTO `golf_rates` VALUES (2, 'Le Grandeur', 'Palm Resort', 'Malaysian', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Published Rates', '2025-04-14 20:39:46', NULL, '2025-04-14 20:40:25', NULL, '1');
INSERT INTO `golf_rates` VALUES (3, 'Que Golf Service', 'Forest City', 'Malaysian', 270, NULL, 370, NULL, NULL, NULL, NULL, NULL, 'Agent Rates', '2025-04-14 20:48:45', NULL, NULL, NULL, '1');
INSERT INTO `golf_rates` VALUES (4, 'Que Golf Service', 'Forest City', 'Malaysian', 300, NULL, 400, NULL, NULL, NULL, NULL, NULL, 'Published Rates', '2025-04-14 20:50:11', NULL, NULL, NULL, '1');
INSERT INTO `golf_rates` VALUES (5, 'Ace ', NULL, 'Malaysian', 280, NULL, 380, NULL, NULL, NULL, NULL, NULL, 'Agent Rates', '2025-04-14 20:51:01', NULL, NULL, NULL, '1');
INSERT INTO `golf_rates` VALUES (6, 'Ace ', NULL, 'Malaysian', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '2025-04-14 20:52:17', NULL, NULL, NULL, '1');
INSERT INTO `golf_rates` VALUES (7, 'Bintang Course', 'Starhill', 'Malaysian', 205, 205, 205, 205, NULL, NULL, 205, 205, 'Agent Rates', '2025-04-14 20:53:16', NULL, NULL, NULL, '1');
INSERT INTO `golf_rates` VALUES (8, 'Bintang Course', 'Starhill', 'Malaysian', 200, 240, 340, 400, NULL, NULL, 200, 240, 'Published Rates', '2025-04-14 20:53:36', NULL, '2025-04-14 20:54:16', NULL, '1');

SET FOREIGN_KEY_CHECKS = 1;
