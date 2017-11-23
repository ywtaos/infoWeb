package chinsoft.service;

import chinsoft.entity.Dict;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;

@Service
public class CDict implements ApplicationListener<ContextRefreshedEvent> {
	
	@Resource
	private  DictService dictService;
	
	public static  int PAGE_SIZE = 20;

	/**
	 *登录成功
	 */
	public static  int RESULT_VALUE_SUCCESS = 1;
	/**
	 *登录失败
	 */
	public static  int RESULT_VALUE_FAIL = 2;
	public static  int RESULT_VALUE_REPEAT = 3;

	public static  int REGIST_CODE_ERROR = 4;
	public static  int REGIST_MOBILE_ERROR = 5;
	public static  int LOGIN_PWD_ERROR = 5;
	//exhibit IsShow
	public static  int Exhibit_IsShow_Yes = 8;

	public static  String WEB_SITE = "http://omermall.532t.com";
//	public static  String PRODUCT_DEFAULT_IMAGE = Utility
//			.servicePath("themes/default/images/producter_picture.png");

	public static  Dict YES = null; // Ã¦ËœÂ¯
	public static  Dict NO = null; // Ã¥ï¿½Â¦

	public static  Dict MemberGroupHeadOffice = null;
	public static  Dict MemberGroupService =null;
	public static  Dict MemberGroupServicePerson = null;
	public static  Dict MemberGroupServiceCompany = null;
	public static  Dict MemberGroupBranch = null;
	public static  Dict MemberGroupMaster =null;
	public static  Dict MemberGroupRescue = null;

	public static  Dict MemberGroup =null;// ç»„ç»‡ç»“æž„
	public static  Dict MemberGroupAdmin = null;// ç®¡ç�†ç»„
	public static  Dict MemberGroupShop = null;//fuwushang
	public static  Dict MemberGroupPartner = null;//çˆ±å¥½è€…
	public static  Dict MemberVipGroup = null;//çˆ±å¥½è€…
	public static  Dict MemberWrite =null;
	public static  Dict MemberCheck = null;


	public static  Dict MemberStatus = null;
	public static  Dict MemberStatusNormal = null;
	public static  Dict MemberStatusDisable =null;

	public static  Dict BackendMenu =null;
	public static  Dict FunctionOperation =null;

	public static  Dict MenuInformationListAll = null;
	public static  Dict MenuUserManager = null;
	public static  Dict MenuShopMember = null;
	public static  Dict MenuAgentGrade = null;

	public static  Dict Area = null;
	public static  Dict ProductStatusEdit = null;
	public static  Dict ProductStyleDefault =null;
	public static  Dict ProductCategory =null;
	public static  Dict ProductCategoryAll = null;
	public static  Dict ProductSort = null;
	public static  Dict ProductColor = null;
	public static  Dict ProductYear = null;
	public static  Dict ProductYearAll = null;
	public static  Dict ProductColorID = null;
	public static  Dict ProductLastedUpdate = null;
	public static  Dict ProductLabel = null;//æ ‡ç­¾
	public static  Dict TraceArtist =null;
	public static  Dict TraceProduct =null;
	public static  Dict TraceSpace = null;

	public static  Dict ShareCategory =null;
	public static  Dict ShareText = null;
	public static  Dict SharePhoto =null;
	public static  Dict ShareVideo = null;

	public static  Dict SpaceCategory =null;

	public static  Dict FavoriteTypeProduct = null;
	public static  Dict FavoriteTypeShop = null;

	public static  Dict ProductStatusSell =null;

	public static  Dict OrdenStatusSubmit = null;
	public static  Dict OrdenStatusCanceled = null;
	public static  Dict OrdenStatusReceived =null;
	public static  Dict OrdenStatusOnRoad =null;
	public static  Dict OrdenStatusArrived = null;
	public static  Dict OrdenStatusFinish = null;
	public static  Dict OrdenStatusReview = null;
	public static  Dict OrdenStatusFail =null;
	public static  Dict OrdenStatusMasterFinish = null;

	public static  Dict RuleAssignTimeSpan =null;
	public static  Dict RuleDistanceSpan = null;
	public static  Dict RuleAbortDays = null;

	public static  Dict OrdenCategoryYes = null;
	public static  Dict OrdenCategoryNO = null;
	public static  Dict Information = null;
	public static  Dict Share =null;
	//public static  Dict ShareHot =null;
	public static  Dict InformationHot =null;
	public static  Dict InformationRecommend = null;
	public static  Dict LookShare = null;
	public static  Dict ScreenShare =null;
	public static  Dict ScreenReason = null;
	public static  Dict TopYes = null;
	public static  Dict TopNo =null;
	//public static  Dict Top = null;
	public static  Dict IsFocus = null;
	public static  Dict ShareStatus =null;
	public static  Dict ShareOpenStatus =null;
	public static  Dict ShareCloseStatus = null;

	@Override
	public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
		 YES = null; // Ã¦ËœÂ¯
		 NO = dictService.getDictByID(3); // Ã¥ï¿½Â¦

		 MemberGroupHeadOffice = dictService.getDictByID(55);
		 MemberGroupService = dictService.getDictByID(1389);
		 MemberGroupServicePerson = dictService.getDictByID(1383);
		 MemberGroupServiceCompany = dictService.getDictByID(1384);
		 MemberGroupBranch = dictService.getDictByID(1382);
		 MemberGroupMaster = dictService.getDictByID(139);
		 MemberGroupRescue = dictService.getDictByID(136);

		 MemberGroup = dictService.getDictByID(127);// ç»„ç»‡ç»“æž„
		 MemberGroupAdmin = dictService.getDictByID(55);// ç®¡ç�†ç»„
		 MemberGroupShop = dictService.getDictByID(875);//fuwushang
		 MemberGroupPartner = dictService.getDictByID(876);//çˆ±å¥½è€…
		 MemberVipGroup = dictService.getDictByID(989);//çˆ±å¥½è€…
		 MemberWrite = dictService.getDictByID(1008);
		 MemberCheck = dictService.getDictByID(1040);


		 MemberStatus = dictService.getDictByID(7);
		 MemberStatusNormal = dictService.getDictByID(8);
		 MemberStatusDisable = dictService.getDictByID(9);

		 BackendMenu = dictService.getDictByID(59);
		 FunctionOperation = dictService.getDictByID(11);

		 MenuInformationListAll = dictService.getDictByID(292);
		 MenuUserManager = dictService.getDictByID(106);
		 MenuShopMember = dictService.getDictByID(1369);
		 MenuAgentGrade = dictService.getDictByID(1373);

		 Area = dictService.getDictByID(142);
		 ProductStatusEdit = dictService.getDictByID(306);
		 ProductStyleDefault = dictService.getDictByID(318);
		 ProductCategory = dictService.getDictByID(854);
		 ProductCategoryAll = dictService.getDictByID(861);
		 ProductSort = dictService.getDictByID(881);
		 ProductColor = dictService.getDictByID(927);
		 ProductYear = dictService.getDictByID(948);
		 ProductYearAll = dictService.getDictByID(954);
		 ProductColorID = dictService.getDictByID(927);
		 ProductLastedUpdate = dictService.getDictByID(882);
		 ProductLabel = dictService.getDictByID(958);//æ ‡ç­¾
		 TraceArtist = dictService.getDictByID(915);
		 TraceProduct = dictService.getDictByID(895);
		 TraceSpace = dictService.getDictByID(875);

		 ShareCategory = dictService.getDictByID(922);
		 ShareText = dictService.getDictByID(923);
		 SharePhoto = dictService.getDictByID(925);
		 ShareVideo = dictService.getDictByID(926);

		 SpaceCategory = dictService.getDictByID(875);

		 FavoriteTypeProduct = dictService.getDictByID(1326);
		 FavoriteTypeShop = dictService.getDictByID(1327);

		 ProductStatusSell = dictService.getDictByID(307);

		 OrdenStatusSubmit = dictService.getDictByID(1331);
		 OrdenStatusCanceled = dictService.getDictByID(1332);
		 OrdenStatusReceived = dictService.getDictByID(1333);
		 OrdenStatusOnRoad = dictService.getDictByID(1334);
		 OrdenStatusArrived = dictService.getDictByID(1335);
		 OrdenStatusFinish = dictService.getDictByID(1336);
		 OrdenStatusReview = dictService.getDictByID(1368);
		 OrdenStatusFail = dictService.getDictByID(1390);
		 OrdenStatusMasterFinish = dictService.getDictByID(1395);

		 RuleAssignTimeSpan = dictService.getDictByID(1392);
		 RuleDistanceSpan = dictService.getDictByID(1393);
		 RuleAbortDays = dictService.getDictByID(1394);

		 OrdenCategoryYes = dictService.getDictByID(906);
		 OrdenCategoryNO = dictService.getDictByID(907);
		 Information = dictService.getDictByID(994);
		 Share = dictService.getDictByID(995);
		// ShareHot = dictService.getDictByID(986);
		 InformationHot = dictService.getDictByID(987);
		 InformationRecommend = dictService.getDictByID(988);
		 LookShare = dictService.getDictByID(1010);
		 ScreenShare = dictService.getDictByID(1011);
		 ScreenReason = dictService.getDictByID(1012);
		 TopYes = dictService.getDictByID(1019);
		 TopNo = dictService.getDictByID(1018);
		// Top = dictService.getDictByID(1017);
		 IsFocus = dictService.getDictByID(1024);
		 ShareStatus = dictService.getDictByID(1035);
		 ShareOpenStatus = dictService.getDictByID(1036);
		 ShareCloseStatus = dictService.getDictByID(1037);
	}
}