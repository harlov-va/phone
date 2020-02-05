<?php	
	function getFormData($method) {
 
		// GET или POST: данные возвращаем как есть
		if ($method === 'GET') return $_GET;
		if ($method === 'POST') return $_POST;
	 
	}

	$method = $_SERVER['REQUEST_METHOD'];
	$formData = getFormData($method);	
	
	// Разбираем url
	$url = (isset($_GET['q'])) ? $_GET['q'] : '';
	$url = rtrim($url, '/');
	$urls = explode('/', $url);	
	// Определяем роутер и url data
	$router = $urls[0];
	$urlData = array_slice($urls, 1);
	
	// Подключаем файл-роутер и запускаем главную функцию
	if($router === "users") {
		include_once 'routers/' . $router . '.php';	
		route($method, $urlData, $formData);
		return;
	}
?>
<!DOCTYPE html><html lang=en><head><meta charset=utf-8><meta http-equiv=X-UA-Compatible content="IE=edge"><meta name=viewport content="width=device-width,initial-scale=1"><link rel=icon href=/favicon.ico><title>Телефонный справочник</title><link rel=stylesheet href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"><link rel=stylesheet href=https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css><link href=/css/app.38783478.css rel=preload as=style><link href=/css/chunk-vendors.53daf1bb.css rel=preload as=style><link href=/js/app.f1c2238f.js rel=preload as=script><link href=/js/chunk-vendors.2252b100.js rel=preload as=script><link href=/css/chunk-vendors.53daf1bb.css rel=stylesheet><link href=/css/app.38783478.css rel=stylesheet></head><body><noscript><strong>We're sorry but ap-project doesn't work properly without JavaScript enabled. Please enable it to continue.</strong></noscript><div id=app></div><script src=/js/chunk-vendors.2252b100.js></script><script src=/js/app.f1c2238f.js></script></body></html>