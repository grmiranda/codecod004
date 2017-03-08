<?php 
    include 'mySQL.php';
    require 'mySQL.php';     
?>

<?php
	$the_request = &$_POST;
	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request  = json_decode($postdata);

        $idR   = $request->remetente;
        $idD   = $request->destinatario;
        $texto = $request->mensagem;
        
        $data = date('Y-m-d H:i:s');

        $sql = "INSERT INTO mensagem (Texto, data, IDRemetente, IDDestinatario) VALUES ('$texto', '$data', '$idR', '$idD')";
        $con->query($sql);
        
        $sql = "SELECT * FROM mensagem WHERE Texto = '$texto' AND data = '$data' AND IDRemetente = '$idR' AND IDDestinatario = '$idD'";
        $result = $con->query($sql);

        $dados = $result->fetch_assoc();
        $idM = $dados['IDMensagem'];

        $sql = "INSERT INTO caixadesaida (IDMensagem, IDUsuario) VALUES ('$idM','$idR')";
        $con->query($sql);

        $sql = "INSERT INTO caixadeentrada (IDMensagem, IDUsuario, lido) VALUES ('$idM','$idD', '0')";
        $con->query($sql);


        echo json_encode(true);
	}
	$con->close();
?>