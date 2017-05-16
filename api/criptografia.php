<?php

class Criptografia
{
    function enc($word)
    {

        $word = str_ireplace("\\", "*", json_encode($word));

        $add_text = "";


        $add_text = "user usuario idUser comum admin id senha password username nome root administrador adm permissao c a ADM comum";


        $chave = 47;

        $word .= $add_text;
        $s = strlen($word) + 1;
        $nw = "";
        $n = $chave;
        for ($x = 1; $x < $s; $x++) {
            $m = $x * $n;
            if ($m > $s) {
                $nindex = $m % $s;
            } else if ($m < $s) {
                $nindex = $m;
            }
            if ($m % $s == 0) {
                $nindex = $x;
            }
            $nw = $nw . $word[$nindex - 1];
        }

       return $nw;

    }

    /**
     * @param string Palavra
     * @return string
     */
    function dec($word)
    {

        $word = str_ireplace("*", "\\", $word);

        $add_text = "";

        $add_text = "user usuario idUser comum admin id senha password username nome root administrador adm permissao c a ADM comum";

        // $chave = 13;
        $chave = 47;
        $s = strlen($word) + 1;
        $nw = "";
        $n = $chave;
        for ($y = 1; $y < $s; $y++) {
            $m = $y * $n;
            if ($m % $s == 1) {
                $n = $y;
                break;
            }
        }
        for ($x = 1; $x < $s; $x++) {
            $m = $x * $n;
            if ($m > $s) {
                $nindex = $m % $s;
            } else if ($m < $s) {
                $nindex = $m;
            }
            if ($m % $s == 0) {
                $nindex = $x;
            }
            $nw = $nw . $word[$nindex - 1];
        }
        $t = strlen($nw) - strlen($add_text);

        return json_decode(substr($nw, 0, $t));
    }

}

?>
