<?php
	include 'getLikeProjetoDeLei.php';
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$vetor   = array();
	$the_request = &$_GET;
	if (isset($_GET["estado"])){
		if ($_GET["estado"] !== ""){
			$estado = $_GET["estado"];
			$id = $_GET["id"];
			$sql = "SELECT * FROM pl WHERE estado = '$estado' ORDER BY IDPL DESC";
			$result = $con->query($sql);
			
			if($estado == 'ap' || $estado == 'tr'){
				while($row=$result->fetch_assoc()){
					$info = getLike($row['IDPL'], $id, $con);
					$info->pl = $row;
					$vetor[] = $info;
				}
			}else{
				while($row=$result->fetch_assoc()){
					$vetor[] = $row;
				}
			}
			
			echo json_encode($vetor);
		}
	}
	
	$con->close();	
?>