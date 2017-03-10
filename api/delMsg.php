<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
        $userID  = $request->IDUsuario;
        $msgID = $request->IDMensagem;

        $sql = "SELECT * FROM caixadeentrada WHERE IDMensagem = '$msgID' AND IDUsuario = '$userID'";
        $result = $con->query($sql);

        $num = $result->num_rows;

        if ($num !== 1){
            $sql = "SELECT * FROM caixadesaida WHERE IDMensagem = '$msgID' AND IDUsuario = '$userID'";
            $result = $con->query($sql);

            $num = $result->num_rows;

            if ($num !== 1){
                echo json_encode(false);
            } else {
                $dados = $result->fetch_assoc();
                $id = $dados['IDCaixaDeSaida'];

                $sql = "DELETE FROM caixadesaida WHERE IDCaixaDeSaida = '$id'";
                $con->query($sql);

                $sql = "SELECT * FROM caixadeentrada WHERE IDMensagem = '$msgID'";
                $result = $con->query($sql);

                $num = $result->num_rows;

                if ($num !== 1){
                    $sql = "DELETE FROM mensagem WHERE IDMensagem = '$msgID'";
                    $con->query($sql);
                }

                echo json_encode(true);
            }
        } else {
            $dados = $result->fetch_assoc();
            $id = $dados['IDCaixaDeEntrada'];

            $sql = "DELETE FROM caixadeentrada WHERE IDCaixaDeEntrada = '$id'";
            $con->query($sql);

            $sql = "SELECT * FROM caixadesaida WHERE IDMensagem = '$msgID'";
            $result = $con->query($sql);

            $num = $result->num_rows;

            if ($num !== 1){
                $sql = "DELETE FROM mensagem WHERE IDMensagem = '$msgID'";
                $con->query($sql);
            }

            echo json_encode(true);
        } 
	}
	
	$con->close();	
?>