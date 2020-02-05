<?php
function route($method, $urlData, $formData) {
     
    
// начало вставки из файла index.php
	
	// настройки сервера
	require_once './config.php';

	// получили ID завода, если не передан то 1
	if (!isset($_GET['id'])) {
		$zavodId = 1;
	} else {
		$zavodId = $_GET['id'];
	}    

	if(!isset($config[$zavodId]["srv"]))
		exit ("Ошибка конфигурации");

	// подключаемся к серверу
	$ds = ldap_connect($config[$zavodId]["srv"]) or die("Error LDAP Connection.");

	// устанавливаем версию протокола (3-я версия UTF8)
	ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3);

	// биндим
	ldap_bind($ds, $config[$zavodId]["login"], $config[$zavodId]["password"]);

	// условия поиска
	#$filter = "(cn=*)";
	$filter = "(&(objectCategory=Person)(!(UserAccountControl:1.2.840.113556.1.4.803:=2)))";
	$sr = ldap_search($ds, $config[$zavodId]["dn"], $filter) or die("Query ERROR: " . ldap_error($ds));

	// выполняем запрос и записываем сотрудников
	$result = ldap_get_entries($ds, $sr);

	// закрываем соединение
	$ldap_close = ldap_close($ds);

    
    // print_r($result[0]["mobile"][0]);
    // print_r($result[0]["department"][0]);
    //  print_r($result);

	$jsonResponse = [];
	foreach ($result as $key => $value) {
		if(isset($value['department'][0]))
            //$jsonResponse[$key] = $value['department'][0];
            array_push($jsonResponse, [
                'name'   => $value['cn'][0],
                'phone' => $value['mobile'][0],
                'title' => $value['title'][0],
                'Отделение' => $value['department'][0]
                ]);
	}    

     if ($method === 'GET') {
         echo json_encode($jsonResponse, JSON_UNESCAPED_UNICODE);  
         return;
     }
  
     // Возвращаем ошибку
     header('HTTP/1.0 400 Bad Request');
     echo json_encode(array(
         'error' => 'Bad Request'
     ));
  
 }
 ?>