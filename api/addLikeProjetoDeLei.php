<?php
include 'addPontuacao.php';
include 'getLikeProjetoDeLei.php';
include 'mySQL.php';
require 'mySQL.php';
?>

<?php
$the_request = &$_POST;
$postdata = file_get_contents("php://input");

if (isset($postdata)) {
    $request = json_decode($postdata);

    $apoio = $request->apoio;
    $IDPL = $request->IDPL;
    $IDUsuario = $request->IDUsuario;
    $IDUsuarioPL = $request->IDUsuarioPL;
	
    if (isset($apoio)) {
        //busca se o usuario ja curtiu aquela solicitacao
        $sql = "SELECT * FROM avaliapl WHERE IDPL = '$IDPL' AND IDUsuario = '$IDUsuario'";
        $result = $con->query($sql);
        $numrow = $result->num_rows;

        if ($numrow == 1) {
            $row = $result->fetch_assoc();

            if ($row['apoio'] == $apoio) {
                //se ja curtiu retorna false
                $sql = "UPDATE avaliapl SET apoio = 'u' WHERE IDPL = '$IDPL' AND IDUsuario = '$IDUsuario'";
                $con->query($sql);
            } else {
                //se for diferente, atualiza
                $sql = "UPDATE avaliapl SET apoio = '$apoio' WHERE IDPL = '$IDPL' AND IDUsuario = '$IDUsuario'";
                $con->query($sql);
            }
        } else {
            //da um like/dislike na solicitacao
            $sql = "INSERT INTO avaliapl (apoio, IDPL, IDUsuario) VALUES ('$apoio', '$IDPL', '$IDUsuario')";
            $con->query($sql);

            if($apoio == 's'){
                pontuarUsuario($IDUsuarioPL, 8, $con);
            }
        }
		
		echo json_encode(getQuantidadeLike($IDPL, $con));
		
    }
}
$con->close();
?>