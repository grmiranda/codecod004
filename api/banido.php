<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php
	$vetor = array();
	$the_request = &$_GET;
	if (isset($_GET["id"])){
		$id = $_GET["id"];

		$sql = " SELECT * FROM usuario WHERE IDUsuario = '$id' ";
		$result = $con->query($sql);
		$dados = $result->fetch_assoc();
		$vetor[] = $dados['banido'];
		$vetor[] = $dados['permissao'];
		echo json_encode($vetor);
	}
	$con->close();
?>
