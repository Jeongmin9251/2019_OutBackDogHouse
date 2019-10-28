<?php
	echo $_POST['on'];
	$mysqli= new mysqli('localhost','pi','raspberry','mysql');
	if($mysqli->connect_errno){
		die('err');
	}
	if($_POST['on']){
		//$a=exec("gpio -g mode 18 output");
	//	$b=exec("gpio -g write 18 1");
		$sql_="update on_off_flag set flag_pel=1 where pk=1";
		if($mysqli->query($sql_)==TRUE)echo"success";
	}
	if($_POST['off']){
	//	$d=exec("gpio -g mode 18 output");
		$sql_="update on_off_flag set flag_pel=0 where pk=1";
		if($mysqli->query($sql_)==TRUE)echo"success";
	//111	$c=exec("gpio -g write 18 0");
	}
	$mysqli->close();
	header("Location:/flag.html");
	exit;
?>
