<?php

$config = array(
    1 => array(
        "title" => "ООО &laquo;nameOrganisation&raquo;", # Название 1 организации
	    "srv" => "ldaps://nameServer", # IP адрес 1 LDAP-сервера (контроллера домена)
        "login" => "nameUser", # пользователь с правами на чтение (пользователь домена)
        "password" => "password", # Пароль пользователя
        "dn" => "ou=Пользователи,dc=domen" # dn откуда берём пользователей
    ),
//    2 => array(
//        "title" => "ЗАО &laquo;Рога и Копыта&raquo;", # Название 2 организации
//        "srv" => "10.1.8.12", # IP адрес  LDAP-сервера (контроллера домена)
//        "login" => "user@domain.local", # пользователь с правами на чтение (пользователь домена)
//        "password" => "Pa$$w0rd", # Пароль пользователя
//        "dn" => "ou=ЗАО Рога и Копыта,ou=Пользователи,dc=domain,dc=local"
//    ),
);
