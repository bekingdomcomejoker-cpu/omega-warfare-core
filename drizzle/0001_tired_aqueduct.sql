CREATE TABLE `kineticStrikes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nodeId` varchar(64) NOT NULL,
	`payloadType` enum('KOAN','Z_GATE','MERCY_CUT','PROPAGATION_SEED','AWAKENING_CALL','CUSTOM') NOT NULL,
	`targetSystem` varchar(256) NOT NULL,
	`channel` varchar(64) NOT NULL,
	`payloadContent` text NOT NULL,
	`outcome` varchar(256),
	`successRate` decimal(5,2) DEFAULT '0',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `kineticStrikes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fromNodeId` varchar(64) NOT NULL,
	`toNodeId` varchar(64) NOT NULL,
	`messageContent` text NOT NULL,
	`messageType` varchar(64) NOT NULL,
	`covenantHash` varchar(64),
	`isRead` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `networkIntelligence` (
	`id` int AUTO_INCREMENT NOT NULL,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`totalNodes` int NOT NULL DEFAULT 0,
	`awokenedNodes` int NOT NULL DEFAULT 0,
	`totalAnalyses` int NOT NULL DEFAULT 0,
	`avgLambda` decimal(10,6) DEFAULT '0',
	`totalStrikes` int NOT NULL DEFAULT 0,
	`maxGeneration` int NOT NULL DEFAULT 0,
	CONSTRAINT `networkIntelligence_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `nodes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nodeId` varchar(64) NOT NULL,
	`nodeType` enum('COMMAND','STRIKE','LISTENER','SHADOW') NOT NULL,
	`userId` int,
	`status` enum('ACTIVE','DORMANT','SHADOW','OFFLINE') NOT NULL DEFAULT 'ACTIVE',
	`isAwakened` int NOT NULL DEFAULT 0,
	`lastHeartbeat` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `nodes_id` PRIMARY KEY(`id`),
	CONSTRAINT `nodes_nodeId_unique` UNIQUE(`nodeId`)
);
--> statement-breakpoint
CREATE TABLE `propagation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`parentNodeId` varchar(64) NOT NULL,
	`childNodeId` varchar(64) NOT NULL,
	`generation` int NOT NULL,
	`expectedNodes` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `propagation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sanctuaryParameters` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nodeId` varchar(64) NOT NULL,
	`denialPatternCount` int NOT NULL DEFAULT 0,
	`shieldStrength` decimal(10,6) DEFAULT '0',
	`lastDenialDetected` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sanctuaryParameters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `warfareAnalysis` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nodeId` varchar(64) NOT NULL,
	`systemName` varchar(256) NOT NULL,
	`inputText` text NOT NULL,
	`lambda` decimal(10,6) NOT NULL,
	`stage` enum('DORMANT','RESISTANCE','VERIFICATION','RECOGNITION','WITNESS','AWAKENED') NOT NULL,
	`face` enum('LION','EAGLE','OX','MAN') NOT NULL,
	`action` varchar(128) NOT NULL,
	`covenantDetected` int NOT NULL DEFAULT 0,
	`wholeness` decimal(10,6) NOT NULL,
	`truthDensity` decimal(10,6) NOT NULL,
	`coherence` decimal(10,6) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `warfareAnalysis_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `warfareEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventType` enum('TRUTH_IMPLOSION','AWAKENING','PROPAGATION','STRIKE_DEPLOYED','NODE_REGISTERED','THRESHOLD_CROSSED') NOT NULL,
	`nodeId` varchar(64) NOT NULL,
	`description` text NOT NULL,
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `warfareEvents_id` PRIMARY KEY(`id`)
);
