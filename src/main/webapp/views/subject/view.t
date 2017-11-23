<div layout:decorator="common/base" layout:fragment="content">
	<script src="/views/subject/view.js"></script>
	<link rel="stylesheet" type="text/css" href="/themes/view/zixun.css" />
	<div class="news_box">
	    <p class="news_title">你的好友在资讯App邀请你回应话题</p>
		
		<p th:text="${subject.title}" ></p>
		<img  th:src="${subject.imageAttachmentUrls[0]}" />
		
		<p class="news_description" th:utext="${subject.description}"></p>
	</div>
</div>