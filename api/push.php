<?php

  function sendMessageToAll($msg){
    $content = array("en" => $msg);
    $fields = array('app_id' => '04946cb2-d0f6-485b-a390-fea608737a42',
                    'included_segments' => array('All'),
                    'data' => array("foo" => "bar"),
                    'contents' => $content,
                    'android_group' => 'appLuiz',
                    'android_group_message' => array("en" => "Você tem $[notif_count] novas notificações"));


    $fields = json_encode($fields);
    // print("\nJSON sent:\n");
    // print($fields);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8', 'Authorization: Basic NTQ1M2ZhNDUtMzkzNS00YzAzLWFhZTItOWFkZGU0ZjY1ZWQz'));

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_POST, TRUE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

    $response = curl_exec($ch);

    curl_close($ch);

    return $response;
  }

  function sendMessageToOne($msg, $id){

  }

  function enviarPushToAll($msg){
    $response = sendMessageToAll($msg);
    $return["allresponses"] = $response;
    $return = json_encode($return);
    // print ("\n\nJSON received:\n");
    // print($return);
    // print("\n");
  }

?>
