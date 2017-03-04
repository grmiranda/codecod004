<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$vetor   = array();
	$the_request = &$_GET;
	if (isset($_GET["id"])){
		if ($_GET["id"] != ""){
			$userID = $_GET["id"];
            $sql = "SELECT * FROM caixadeentrada WHERE IDUsuario = '$userID'";
            $result = $con->query($sql);

            while($row=$result->fetch_assoc()){
                $id = $row['IDMensagem'];
				
				$sql = "SELECT * FROM mensagem WHERE IDMensagem = '$id'";
				$result1 = $con->query($sql);

				$msg = $result1->fetch_assoc();
				
				$userID = $msg['IDRemetente'];
				$sql = "SELECT * FROM usuario WHERE IDUsuario = '$userID'";
				$result = $con->query($sql);

				$rem = $result->fetch_assoc();

				$temp = array();
				$temp['id'] = $id;
				$temp['remetente'] = $msg['IDRemetente'];
				$temp['destinatario'] = $msg['IDDestinatario'];
				$temp['mensagem'] = $msg['Texto'];
				$temp['data'] = $msg['data'];
				$temp['lida'] = $row['lido'];
				$temp['nome'] = $rem['nome'];
				$temp['foto'] = $rem['fotoURL'];
				$vetor[] = $temp;
            }
			echo json_encode($vetor);
        } 
	} 	
	$con->close();	
?>