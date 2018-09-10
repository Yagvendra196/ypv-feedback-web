<body style="font-family: monospace;">
<?php
	include_once("minifier.php");
	
	/* FILES ARRAYs
	 * Keys as input, Values as output */ 
	/*
	$js = array(
		"js/application.js" 	=> "js/application.min.js",
		"js/main.js" 			=> "js/main.min.js"
	);
	
	$css = array(
		"css/application.css"	=> "css/application.min.css",
		"css/main.css"			=> "css/main.min.css"
	);
	
	minifyJS($js);
	minifyCSS($css);*/

	if ( isset($_GET['p']) && (stristr($_GET['p'],'.css') || stristr($_GET['p'],'.js')) ) { 
		$cp = explode('/', $_GET['p']);
		$lastIndex = count($cp)-1;
		$f = $cp[$lastIndex];
		$np = $cp;
		unset($np[$lastIndex]);
		$np = implode('/', $np).'/';

		if (stristr($_GET['p'],'.css')) { 
			$f = substr($f, 0,-4);
			$nf = $np.$f.'-min';
		} else if(stristr($_GET['p'],'.js')) {
			$f = substr($f, 0,-3);
			$nf = $np.$f.'-min';
		}

		if (isset($_GET['v']) && $_GET['v']!='f') {
				$nf = $nf.'-v-'.$_GET['v'];
		}

		if (stristr($_GET['p'],'.css')) { 
			$nf = $nf.'.css';			
			$css = array('../'.$_GET['p'] => '../'.$nf);
			minifyCSS($css);
			echo 'Success';
		} else if(stristr($_GET['p'],'.js')) {
			$nf = $nf.'.js';			
			$js = array('../'.$_GET['p'] => '../'.$nf);
			minifyJS($js);
			echo 'Success';
		}
		else
		{
			echo 'wrong file';
		}
	}
	else
	{
		echo 'wrong file';
	}
?>
</body>
