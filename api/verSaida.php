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
            $sql = "SELECT * FROM caixadesaida WHERE IDUsuario = '$userID' ORDER BY IDCaixaDeSaida DESC";
            $result = $con->query($sql);

            while($row=$result->fetch_assoc()){
                $id = $row['IDMensagem'];
				
				$sql = "SELECT * FROM mensagem WHERE IDMensagem = '$id'";
				$result1 = $con->query($sql);

				$msg = $result1->fetch_assoc();
				
				$userID = $msg['IDDestinatario'];
				$sql = "SELECT * FROM usuario WHERE IDUsuario = '$userID'";
				$result1 = $con->query($sql);

				$des = $result1->fetch_assoc();

				$temp = array();
				$temp['id'] = $id;
				$temp['remetente'] = $msg['IDRemetente'];
				$temp['destinatario'] = $msg['IDDestinatario'];
				$temp['mensagem'] = $msg['Texto'];
				$temp['data'] = $msg['data'];
				$temp['lida'] = 0;
				$temp['nome'] = $des['nome'];
				$temp['foto'] = $des['fotoURL'];
				$temp['Push'] = $des['Push'];
				$temp['IDOutro'] = $userID;
 				$vetor[] = $temp;
            }
			echo json_encode($vetor);
        } 
	} 	
	$con->close();	
?>