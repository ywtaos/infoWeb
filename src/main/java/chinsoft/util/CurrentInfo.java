package chinsoft.util;

import chinsoft.entity.Member;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CurrentInfo {
	private static List<Member> onlineMembers = new ArrayList<Member>();
	public static List<Member> updateOnlineStatus()
    {
        try
        {
            Member member = getOnlineMemberByID(getCurrentMember().getID());
            if (member == null){
                member = getCurrentMember();
                onlineMembers.add(member);
            }
            member.setLastLoginDate(new Date());
            /*
            for (Member m : onlineMembers){
                long nSeconds = DateHelper.getSeconds(new Date(),  m.getLastLoginDate());
                if (nSeconds > 30){
                    onlineMembers.remove(m);
                }
            }*/
        }
        catch (Exception e){}
        return onlineMembers;
        
    }
    public static Member getOnlineMemberByID(String strMemberID){
        if (onlineMembers != null && onlineMembers.size() > 0){
            for(Member member : onlineMembers){
                if (member.getID().equals(strMemberID)){
                    return member;
                }
            }
        }
       
        return null;
    }



	public static void setCurrentMember(Member member, HttpServletRequest request) {
	
		HttpContext.setSessionValue(Utility.SessionKey_CurrentMember, member,request);
	}
	public static boolean IsAdmin()
    {
        return IsAdmin(CurrentInfo.getCurrentMember().getUsername());
    }

    public static boolean IsAdmin(String strUsername)
    {
        return "admin" .equals(strUsername);
    }
	public static Member getCurrentMember() {
		try {
			return (Member)HttpContext.getSessionValue(Utility.SessionKey_CurrentMember);
		} catch (Exception e) {
			e.printStackTrace();
			LogPrinter.info("getCurrentMember:" + e.getMessage());
		}
		return null;
	}

	public static boolean checkAccess() {
		boolean isAccess = true;
		try {
			Member member = (Member) HttpContext.getSessionValue(Utility.SessionKey_CurrentMember);
			if (member == null) {
				isAccess = false;
			}
		} catch (Exception e) {
			LogPrinter.info("checkAccess" +e.getMessage());
		}
		return isAccess;
	}
	
	public static boolean isPubMember(String strMemberID) {
		return CurrentInfo.getCurrentMember().getID().equals(strMemberID);
	}

    /**
     * 驗證是否是一個角色
     */
//    public static boolean isInRole(Integer nMenuID)
//    {
//        String groupMenus = new GroupMenuManager().getGroupFunctions(getCurrentMember().getGroupID());
//        if(Utility.contains(groupMenus, Utility.toSafeString(nMenuID))){
//            return true;
//        }
//        return false;
//    }
}
