<?php
include 'criptografia.php';
?>
<?php
ini_set('default_charset','UTF-8');

$cript = new Criptografia;


$teste = 'oa[ie o"" s "as"wsit,ra ""rtdoaeI"di"""ao tLioUemft:rmMo",ruc:rh"sira2ahm,:aoidtm":an:,ouctiRlndmu"a"aaDo:]e  "ts:smcd:und""uf asa," i"]as otUa"iom,dsunA£"[sdoonu"ars""seaoos"nr©d"ommo[cUro"oe, no""dsr Ãa:uraaEpopee,oUs dtU,itÃn"iudl:aeer{tR]o co,iueand"}osca"i pd"io rnnD"msta:rmau"zms ';
//echo "<script>alert('".utf_encode('Campo de preenchimento obrigat\u00f3rio')."');</script>";
//echo strlen($teste);
echo $cript->dec($teste);

?>
