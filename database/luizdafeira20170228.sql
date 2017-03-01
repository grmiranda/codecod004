-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: luizdafeira
-- ------------------------------------------------------
-- Server version	5.7.16-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apoiosolicitacao`
--

DROP TABLE IF EXISTS `apoiosolicitacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apoiosolicitacao` (
  `IDApoioSolicitacao` int(11) NOT NULL AUTO_INCREMENT,
  `IDSolicitacao` int(11) DEFAULT NULL,
  `IDUsuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`IDApoioSolicitacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apoiosolicitacao`
--

LOCK TABLES `apoiosolicitacao` WRITE;
/*!40000 ALTER TABLE `apoiosolicitacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `apoiosolicitacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliapl`
--

DROP TABLE IF EXISTS `avaliapl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `avaliapl` (
  `IDAvaliaPL` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuario` int(11) DEFAULT NULL,
  `IDPL` int(11) DEFAULT NULL,
  `apoio` enum('s','n') DEFAULT NULL,
  PRIMARY KEY (`IDAvaliaPL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliapl`
--

LOCK TABLES `avaliapl` WRITE;
/*!40000 ALTER TABLE `avaliapl` DISABLE KEYS */;
/*!40000 ALTER TABLE `avaliapl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `denuncia`
--

DROP TABLE IF EXISTS `denuncia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `denuncia` (
  `IDDenuncia` int(11) NOT NULL,
  `IDUsuario` int(11) DEFAULT NULL,
  `IDSolicitacao` int(11) DEFAULT NULL,
  `descricao` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`IDDenuncia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `denuncia`
--

LOCK TABLES `denuncia` WRITE;
/*!40000 ALTER TABLE `denuncia` DISABLE KEYS */;
/*!40000 ALTER TABLE `denuncia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `depoimento`
--

DROP TABLE IF EXISTS `depoimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `depoimento` (
  `IDDepoimento` int(11) NOT NULL,
  `Texto` varchar(500) DEFAULT NULL,
  `IDUsuario` varchar(45) DEFAULT NULL,
  `estado` enum('sa','ap') DEFAULT NULL,
  PRIMARY KEY (`IDDepoimento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `depoimento`
--

LOCK TABLES `depoimento` WRITE;
/*!40000 ALTER TABLE `depoimento` DISABLE KEYS */;
/*!40000 ALTER TABLE `depoimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `endereco` (
  `IDEndereco` int(11) NOT NULL,
  `endereco` varchar(200) DEFAULT NULL,
  `Bairro` varchar(45) DEFAULT NULL,
  `Cidade` varchar(45) DEFAULT NULL,
  `IDUsuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`IDEndereco`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensagem`
--

DROP TABLE IF EXISTS `mensagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mensagem` (
  `IDMensagem` int(11) NOT NULL,
  `Texto` longtext,
  `IDRemetente` int(11) DEFAULT NULL,
  `IDDestinatario` int(11) DEFAULT NULL,
  PRIMARY KEY (`IDMensagem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensagem`
--

LOCK TABLES `mensagem` WRITE;
/*!40000 ALTER TABLE `mensagem` DISABLE KEYS */;
/*!40000 ALTER TABLE `mensagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pl`
--

DROP TABLE IF EXISTS `pl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pl` (
  `IDPL` int(11) NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(200) DEFAULT NULL,
  `Ementa` varchar(500) DEFAULT NULL,
  `fotoURL` longtext,
  `IDUsuario` int(11) DEFAULT NULL,
  `estado` enum('sa','pr','tr','cp','cn') DEFAULT NULL,
  PRIMARY KEY (`IDPL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pl`
--

LOCK TABLES `pl` WRITE;
/*!40000 ALTER TABLE `pl` DISABLE KEYS */;
/*!40000 ALTER TABLE `pl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicacao`
--

DROP TABLE IF EXISTS `publicacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publicacao` (
  `IDPublicacao` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `texto` longtext,
  `data` date DEFAULT NULL,
  `fotoURL` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`IDPublicacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicacao`
--

LOCK TABLES `publicacao` WRITE;
/*!40000 ALTER TABLE `publicacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `publicacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requerimento`
--

DROP TABLE IF EXISTS `requerimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `requerimento` (
  `IDRequerimento` int(11) NOT NULL,
  `fotoURL` longtext,
  `data` date DEFAULT NULL,
  `IDSolicitacao` int(11) DEFAULT NULL,
  PRIMARY KEY (`IDRequerimento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requerimento`
--

LOCK TABLES `requerimento` WRITE;
/*!40000 ALTER TABLE `requerimento` DISABLE KEYS */;
/*!40000 ALTER TABLE `requerimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitacao`
--

DROP TABLE IF EXISTS `solicitacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solicitacao` (
  `IDSolicitacao` int(11) NOT NULL,
  `fotoURL` longtext,
  `titulo` varchar(100) DEFAULT NULL,
  `descricao` longtext,
  `andamento` longtext,
  `estado` enum('sa','ap','rc','cp','cn') DEFAULT NULL,
  `dataEntrada` date DEFAULT NULL,
  `dataRealizacao` date DEFAULT NULL,
  `IDUsuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`IDSolicitacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitacao`
--

LOCK TABLES `solicitacao` WRITE;
/*!40000 ALTER TABLE `solicitacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefone`
--

DROP TABLE IF EXISTS `telefone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `telefone` (
  `IDTelefone` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(45) DEFAULT NULL,
  `IDUsuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`IDTelefone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefone`
--

LOCK TABLES `telefone` WRITE;
/*!40000 ALTER TABLE `telefone` DISABLE KEYS */;
/*!40000 ALTER TABLE `telefone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `IDUsuario` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `nascimento` date DEFAULT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `fotoURL` longtext,
  `genero` enum('m','f') DEFAULT NULL,
  `gID` varchar(100) DEFAULT NULL,
  `fID` varchar(100) DEFAULT NULL,
  `Push` longtext,
  PRIMARY KEY (`IDUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-28 23:15:40
