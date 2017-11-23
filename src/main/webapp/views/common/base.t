<html xmlns:th="http://www.thymeleaf.org" xmlns:layout="http://www.ultraq.net.nz/web/thymeleaf/layout">
<head>
<script src="/scripts/jquery/jquery.js"></script>
<script src="/scripts/loading/loading.js"></script>
<script src="/scripts/json/json.js"></script>
<script src="/scripts/template/template.js"></script>
<script src="/scripts/storage/storage.js"></script>
<script src="/scripts/jquery/bgiframe.js"></script>
<script src="/scripts/window/window.js"></script>
<script src="/scripts/cs/cdict.js"></script>
<script src="/views/common/base.js"></script>
<link rel="stylesheet" type="text/css" href="/scripts/bulma/bulma.css" />
<link rel="stylesheet" type="text/css" href="/scripts/bulma/font-awesome.css" />
<link rel="stylesheet" type="text/css" href="/scripts/window/style.css" />
<link rel="stylesheet" type="text/css" href="/themes/mvc/style.css" />
<script src="/scripts/cs/cs.js"></script>
<meta charset="utf-8" />
<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width"/>

</head>
<body>
	
		<div id="header">
			<a id="logo">资讯APP</a>
			<a id="post_shop" href="http://j.532t.com:86/android.apk">打开</a>
			<div style="clear:both;"></div>
		</div>
		<div id="main" layout:fragment="content"></div>
		
		
		<div id="footer">
			<div class="footer_left">
				<span class="footer_logo">资讯APP</span><span class="footer_desc"> / 查看全部精彩评论</span><a href="http://j.532t.com:86/android.apk" class="footer_open">打开</a>
				<div style="clear:both;"></div>
			</div>
			
		</div>			
</body>
</html>