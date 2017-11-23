<div layout:decorator="common/base" layout:fragment="content">
	<script src="/views/information/view.js"></script>
	<link rel="stylesheet" type="text/css" href="/themes/view/zixun.css" />
	
	
	<div class="news_box">
	     <p class="news_title" th:if="${information.title}" th:text="${information.title}" ></p>
		 
		<img class="news_ico" th:src="${information.pubMember.imageUrl}" />
		
		<div class="news_author">
			<p th:text="${information.pubMember.name}" ></p>
			<p th:text="${information.pubDateStr}" ></p>
		</div>
		<a href="#" class="news_favor">关注</a>
		
		<div style="clear:both;"></div>
		<div th:if="${information.title}" class="swiper-slide" th:each="imageUrl:${information.imageUrls}">
		     <img   th:src="${imageUrl}" />
		 </div>	
		<p th:utext="${information.content}"></p>
				
	</div>
</div>