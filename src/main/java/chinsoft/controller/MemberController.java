package chinsoft.controller;


import chinsoft.service.CDict;
import chinsoft.entity.Member;
import chinsoft.service.MemberService;
import chinsoft.util.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping( value = "/service/member/" )
public class MemberController extends BaseController{

	@Resource
	private MemberService memberService;

	/**
	 * 登录方法1
	 * @param formData 请求参数 username 用户名; password:密码
	 * @param request 获取session
	 * @return  字符串：Utility.RESULT_VALUE_OK
	 */
    @RequestMapping(value = "login", method = RequestMethod.POST,produces = {"application/json", "application/xml"})
	@ResponseBody
	public String login(@RequestBody String formData, HttpServletRequest request) {
    	LogPrinter.info("000000000000000");
    	String strUsername = getParameter(formData,"username");
		String strPassword = getParameter(formData,"password");
		LogPrinter.info("000000000000000"+strUsername);
		
		 String strResult =memberService.login(strUsername, strPassword);
		if (strResult.equals(Utility.RESULT_VALUE_OK) ){
			Member member =  memberService.getMemberByUsername(strUsername);
			//member.setClientIP(request.getRemoteAddr());
			member.setLastLoginDate(new Date());
			memberService.saveMember(member);
			CurrentInfo.setCurrentMember(member,request);
		}
		LogPrinter.info("0000000000000001"+strResult);
		return strResult;
	}

	/**
	 * 登录方法2
	 * @param formData 请求参数 username 用户名; password:密码
	 * @param request 获取session
	 * @return
	 *         正确 ：1 :登录成功
	 *         错误：
	 *          2：密码错误
	 *          3：密码为空
	 *          4：用户名或密码错误
	 */
	@RequestMapping(value = "login_", method = RequestMethod.POST)
	@ResponseBody
	public int login_(@RequestBody String formData, HttpServletRequest request) {

		String strUsername = getParameter(formData,"username");
		String strPassword = getParameter(formData,"password");

		String strResult =memberService.login(strUsername, strPassword);
		if (strResult == Utility.RESULT_VALUE_OK) {
			Member member = memberService.getMemberByUsername(strUsername);
			//member.setClientIP(request.getRemoteAddr());
			member.setLastLoginDate(new Date());
			memberService.saveMember(member);
			CurrentInfo.setCurrentMember(member,request);
			return  CDict.RESULT_VALUE_SUCCESS ;
		}else if(ResourceHelper.Member_PasswordNotMatch.equals(strResult)){
			return CDict.LOGIN_PWD_ERROR;
		}else if(ResourceHelper.Member_PasswordIsNull.equals(strResult)){
			return CDict.REGIST_MOBILE_ERROR;
		}else{
			return CDict.RESULT_VALUE_FAIL;
		}
	}

	/**
	 * 修改密码
	 * @param formData 请求参数：
	 *                     password：旧密码
	 *                     newPassword：新密码
	 *                     verfyNewPassword： 重复的新密码
	 *
	 * @return 正确 ：Utility.RESULT_VALUE_OK
	 *         错误：为空
	 *
	 */
	@RequestMapping(value = "changepassword", method = RequestMethod.POST)
	@ResponseBody
	public String changePassword(@RequestBody String formData,HttpServletRequest request) {
		String strPassword = getParameter(formData,"password");
		String strNewPassword = getParameter(formData,"newPassword");
		String strVerfyNewPassword = getParameter(formData,"verfyNewPassword");
		if(!strNewPassword.equals(strVerfyNewPassword)){
			return("");
		}
		Member member=CurrentInfo.getCurrentMember();
		if(strPassword.equals(member.getPassword())){
			member.setPassword(DEncrypt.md5(strNewPassword));
			memberService.saveMember(member);
			CurrentInfo.setCurrentMember(member,request);
			return(Utility.RESULT_VALUE_OK);
		}else{
			return("");
		}
	}

	/**
	 * 根据用户ID获取用户的详细信息
	 * @param formData id 当前用户ID
	 * @return 用户详细信息
	 */
	@RequestMapping(value = "getmemberbyid", method = RequestMethod.POST)
	@ResponseBody
	public Member getMemberByID(@RequestBody String formData) {
		String strMemberID = getParameter(formData,"id");

		Member member = memberService.getMemberByID(strMemberID);
		return member;
	}


	/**
	 * 根据ID获取当前用户的artists
	 * @param formData  id 当用用户ID
	 * @return 字符串数组
	 */
	@RequestMapping(value = "getmemberartistsbyid", method = RequestMethod.POST)
	@ResponseBody
	public List<String> getMemberArtistsByID(@RequestBody String formData) {
		String strMemberID = getParameter(formData,"id");
		List<String> allArtists   = memberService.getMemberArtistsByID(strMemberID);
		return allArtists;
	}

	/**
	 * 根据用户名获取当前用户的信息
	 * @param formData username 用户名
	 * @return 字符串对象
	 */
	@RequestMapping(value = "getmemberbyusername", method = RequestMethod.POST)
	@ResponseBody
	public Member getMemberByUsername(@RequestBody String formData) {
		String username = getParameter(formData, "username");
		return memberService.getMemberByUsername(username);
	}

	/**
	 * 用户分页查询
	 * @param formData pagesize：每页显示几条
	 *                 pageindex:  当前页
	 *                 searchKeyword：查询关键字，针对用户名
	 *                 searchGroupID：分组ID
	 *                 backstage：是否为后台获取
	 *                 searchStatusID：查询状态
	 *                 searchIsRecommendID：推荐ID
	 * @return 分页对象数组
	 */
	@RequestMapping(value = "getmembers", method = RequestMethod.POST)
	@ResponseBody
	public PagingData getMembers(@RequestBody String formData) {

		int nPageSize= Utility.toSafeInt(getParameter(formData,"pagesize"));
		if(nPageSize<=0){
			nPageSize=CDict.PAGE_SIZE;
		}
		int nPageIndex = Utility.toSafeInt(getParameter(formData,"pageindex"));
		String strKeyword = getParameter(formData,"searchKeyword");
		if ("".equals(strKeyword)) {
			strKeyword=getParameter(formData,"searchKeyword");
		}
		int searchGroupID=Utility.toSafeInt(getParameter(formData,"searchGroupID"));
		String searchMemberID=getParameter(formData,"id");
		//是否为后台获取
		int backstage=Utility.toSafeInt(getParameter(formData,"backstage"));
		Member member = CurrentInfo.getCurrentMember();
		if(backstage!=-1){
			LogPrinter.info("1478529630");
			if(!member.getGroupID().equals(CDict.MemberGroupAdmin.getID())){
				searchMemberID=CurrentInfo.getCurrentMember().getID();
				LogPrinter.info("1478529630"+searchMemberID);
			}
		}
		int searchStatusID=Utility.toSafeInt(getParameter(formData,"searchStatusID"));
		int searchIsRecommendID =Utility.toSafeInt(getParameter(formData, "searchIsRecommendID"));
		List<Member> data =memberService.getMembers(nPageIndex, nPageSize, strKeyword,searchGroupID,searchStatusID,searchIsRecommendID,searchMemberID);
		long nCount = memberService.getMembersCount(strKeyword,searchGroupID,searchStatusID,searchIsRecommendID,searchMemberID);

		PagingData pagingData = new PagingData();
		pagingData.setCount(nCount);
		pagingData.setData(data);
		return pagingData;
	}

	/**
	 * 查询用户的角色的分页查询
	 * @param formData pagesize：每页显示几条
	 *                 pageindex:  当前页
	 *                 searchGroupID：分组ID
	 *                 backstage：是否为后台获取
	 *                 searchStatusID：查询状态
	 *                 searchIsRecommendID：推荐ID
	 * @return
	 */
	@RequestMapping(value = "getartists", method = RequestMethod.POST)
	@ResponseBody
	public PagingData getArtists(@RequestBody String formData) {
		int nPageSize= Utility.toSafeInt(getParameter(formData,"pagesize"));
		int searchGroupID=Utility.toSafeInt(getParameter(formData,"searchGroupID"));
		int searchIsRecommendID =Utility.toSafeInt(getParameter(formData, "searchIsRecommendID"));
		String searchSpaceID=getParameter(formData,"searchSpaceID");
		if(nPageSize<=0){
			nPageSize=CDict.PAGE_SIZE;
		}
		int nPageIndex = Utility.toSafeInt(getParameter(formData,"pageindex"));
		List<Member> data =memberService.getArtists(nPageIndex, nPageSize, searchGroupID,searchIsRecommendID,searchSpaceID);
		long nCount = memberService.getArtistsCount(searchGroupID,searchIsRecommendID,searchSpaceID);

		PagingData pagingData = new PagingData();
		pagingData.setCount(nCount);
		pagingData.setData(data);
		return pagingData;
	}


	@RequestMapping(value = "getartistsbyrecommend", method = RequestMethod.POST)
	@ResponseBody
	public PagingData getArtistsBy(@RequestBody String formData) {
		int searchGroupID=Utility.toSafeInt(getParameter(formData,"searchGroupID"));
		int searchIsRecommendID =Utility.toSafeInt(getParameter(formData, "searchIsRecommendID"));
		int nPageSize= Utility.toSafeInt(getParameter(formData,"pagesize"));
		if(nPageSize<=0){
			nPageSize=CDict.PAGE_SIZE;
		}
		int nPageIndex = Utility.toSafeInt(getParameter(formData,"pageindex"));

		return memberService.getArtistsByRecommend(nPageIndex,nPageSize,searchIsRecommendID);
	}

	@RequestMapping(value = "getmyplatform", method = RequestMethod.POST)
	@ResponseBody
	public String getMyPlatform(@RequestBody String formData) {
		Member member = CurrentInfo.getCurrentMember();
		return "/pages/common/dashboard.htm";


//		if(member.getGroupID().equals(CDict.MemberGroupAdmin.getID())||member.getGroupID().equals(CDict.MemberWrite.getID())||member.getGroupID().equals(CDict.MemberCheck.getID())||member.getGroupID().equals(CDict.MemberGroupShop.getID())){
//			return "/pages/common/dashboard.htm";
//		}else{
//			return "/artist/view/"+member.getID();
//		}
	}

	@RequestMapping(value = "getsignoutplatform", method = RequestMethod.POST)
	@ResponseBody
	public String getSignOutPlatform(@RequestBody String formData) {
		return "../common/login.htm";
	}

	/**
	 * 登出
	 * @param formData
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "signout", method = RequestMethod.POST)
	@ResponseBody
	public String signOut(@RequestBody String formData,HttpServletRequest request) {
		HttpContext.signOut(request);
		return Utility.RESULT_VALUE_OK;
	}

	/**
	 * 保存用户
	 * @param formData
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "savemember", method = RequestMethod.POST)
	@ResponseBody
	public String saveMember(@RequestBody String formData,HttpServletRequest req) {
		int nGroup=Utility.toSafeInt(getParameter(formData,"groupID"));
		String strMemberID = getParameter(formData,"ID");
		String strCode = getParameter(formData,"code");

		LogPrinter.info("getPickMembersgetPickMembers" );
		Member member = null;
		String strOldPassword = "";
		if(!strMemberID.equals("")){
			member = memberService.getMemberByID(strMemberID);
			strOldPassword = member.getPassword();
		}
		if(member == null){
			member = new Member();
		}
		updateEntityFromFormData(member, formData);
		LogPrinter.info("getPickMembersgetPickMembers"+member );
		if(!strOldPassword.equals(member.getPassword())){
			member.setPassword(DEncrypt.md5(member.getPassword()));
		}
		memberService.saveMember(member);
		return Utility.RESULT_VALUE_OK;
	}

	/**
	 * 保存
	 * @param formData
	 * @return
	 */
	@RequestMapping(value = "savespaceartist", method = RequestMethod.POST)
	@ResponseBody
	public String saveSpaceArtist(@RequestBody String formData){
		//int nIsShow=Utility.toSafeInt(getParameter(formData,"isShow"));
		LogPrinter.info(formData+"99990009999111");
		String strMemberID = getParameter(formData, "id");
		String strName = getParameter(formData, "artistname");
		Member member = new Member();
		if (!StringUtils.isEmpty(strMemberID))
		{
			member = memberService.getMemberByID(strMemberID);
		}
		String artist = member.getArtists();
		if(!StringUtils.isEmpty(artist)){
			member.setArtists(artist+","+strName);
		}else{
			member.setArtists(strName);
		}
		updateEntityFromFormData(member, formData);
		memberService.saveSpaceArtist(member);
		return Utility.RESULT_VALUE_OK;
	}

	@RequestMapping(value = "removespaceartist", method = RequestMethod.POST)
	@ResponseBody
	public String RemoveSpaceArtist(@RequestBody String formData)
	{
		String removedNames = getParameter(formData, "removedNames");
		String strMemberID = getParameter(formData, "id");
		memberService.removeSapceArtists(removedNames,strMemberID);
		return Utility.RESULT_VALUE_OK;
	}

	@RequestMapping(value = "regist", method = RequestMethod.POST)
	@ResponseBody
	public int regist(HttpServletRequest req, HttpServletResponse res, @RequestBody String formData) {
		try {

			String strUsername = getParameter(formData,"username");
			String strPassword = getParameter(formData,"password");
			String strCode = getParameter(formData,"code");

			HttpSession session = req.getSession();
			String code = (String)session.getAttribute(strUsername);
			if(!strCode.equals(code)){
				return CDict.REGIST_CODE_ERROR;
			}
			/*if(!new MemberManager().isMobileNO(strUsername)){
				LogPrinter.info("****************é�¢ã„¦åŸ›é�šå¶†æ¹�ç’‡ï¿½");
				return CDict.REGIST_MOBILE_ERROR;
			}*/

			Member member = memberService.getMemberByUsername(strUsername);
			if(member != null){
				return CDict.RESULT_VALUE_REPEAT;
			}

			member = new Member();

			member.setUsername(strUsername);
			member.setMobile(strUsername);
			member.setPassword(DEncrypt.md5(strPassword));
			member.setName(strUsername);
			if(member.getImageID()==null){
				member.setImageID("2c9acabc5e6ef92d015e6efe965c0000");
			}
			if(StringUtils.isEmpty(String.valueOf(member.getGroupID()))){
				member.setGroupID(CDict.MemberVipGroup.getID());
			}
			memberService.saveMember(member);

			return CDict.RESULT_VALUE_SUCCESS;

		} catch (Exception err) {
			LogPrinter.info("savemember" + err.getMessage());
			return CDict.RESULT_VALUE_FAIL;
		}
	}

	//===========================以下是未知接口========================================================//
	/**
	 * 未知
	 * @param formData searchMemberID 用户ID
	 * @return
	 */
	@RequestMapping(value = "updatememberattentionids", method = RequestMethod.POST)
	@ResponseBody
	public int updateMemberAttentionIDs(@RequestBody String formData) {
		String memberID = getParameter(formData, "searchMemberID");
		Member currentMember = CurrentInfo.getCurrentMember();
		String currentMemberID = "";
		if(currentMember!=null){
			currentMemberID = currentMember.getID();
		}else{
			return CDict.RESULT_VALUE_FAIL;
		}
		Member member = memberService.getMemberByID(memberID);
		memberService.saveMember(member);
		return CDict.RESULT_VALUE_SUCCESS;
	}

	@RequestMapping(value = "getcurrentmember", method = RequestMethod.POST)
	@ResponseBody
	public Member getCurrentMember(@RequestBody String formData) {
		return CurrentInfo.getCurrentMember();
	}

	@RequestMapping(value = "getpickmembers", method = RequestMethod.POST)
	@ResponseBody
	public List<Member> getPickMembers(@RequestBody String formData) {
		String strKeyword = getParameter(formData, "searchKeyword");
		int searchGroupIDs = Utility.toSafeInt(getParameter(formData, "searchGroupID"));
		List<Member> member = memberService.getPickMembers(strKeyword);
		return member;
	}

}