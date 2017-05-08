<?php

class Criptografia {


    function enc($word){
        $add_text = "esse texto deveria complicar";
        $chave = 5;
       $word .= $add_text;
       $s = strlen($word)+1;
       $nw = "";
       $n = $chave;
       for ($x = 1; $x < $s; $x++){
           $m = $x*$n;
           if ($m > $s){
               $nindex = $m % $s;
           }
           else if ($m < $s){
               $nindex = $m;
           }
           if ($m % $s == 0){
               $nindex = $x;
           }
           $nw = $nw.$word[$nindex-1];
       }
       return $this->enc2($nw);
    }

function enc2($word){
        $add_text = "segundaPassada";
        $chave = 13;
       $word .= $add_text;
       $s = strlen($word)+1;
       $nw = "";
       $n = $chave;
       for ($x = 1; $x < $s; $x++){
           $m = $x*$n;
           if ($m > $s){
               $nindex = $m % $s;
           }
           else if ($m < $s){
               $nindex = $m;
           }
           if ($m % $s == 0){
               $nindex = $x;
           }
           $nw = $nw.$word[$nindex-1];
       }
       return $nw;
    }

    /**
    * @param string Palavra
    * @return string
    */
    function dec($word){

        $add_text = "segundaPassada";
        $chave = 13;

       $s = strlen($word)+1;
       $nw = "";
       $n = $chave;
       for ($y = 1; $y < $s; $y++){
           $m = $y*$n;
           if ($m % $s == 1){
               $n = $y;
               break;
           }
       }
       for ($x = 1; $x < $s; $x++){
           $m = $x*$n;
           if ($m > $s){
               $nindex = $m % $s;
           }
           else if ($m < $s){
               $nindex = $m;
           }
           if ($m % $s == 0){
               $nindex = $x;
           }
           $nw = $nw.$word[$nindex-1];
       }
       $t = strlen($nw) - strlen($add_text);
       return $this->dec2(substr($nw, 0, $t));
    }

	function dec2($word){

		$add_text = "esse texto deveria complicar";
        $chave = 5;

       $s = strlen($word)+1;
       $nw = "";
       $n = $chave;
       for ($y = 1; $y < $s; $y++){
           $m = $y*$n;
           if ($m % $s == 1){
               $n = $y;
               break;
           }
       }
       for ($x = 1; $x < $s; $x++){
           $m = $x*$n;
           if ($m > $s){
               $nindex = $m % $s;
           }
           else if ($m < $s){
               $nindex = $m;
           }
           if ($m % $s == 0){
               $nindex = $x;
           }
           $nw = $nw.$word[$nindex-1];
       }
       $t = strlen($nw) - strlen($add_text);
       return substr($nw, 0, $t);
    }

}
?>
