package chinsoft.service;

import chinsoft.dao.MemberDao;
import chinsoft.entity.Member;
import chinsoft.util.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;


/**
 * @author xutao
 * @version V1.0 创建时间：2017/11/20 21:12
 *          Copyright 2017 by 言午工作室
 */
@Service
public class MemberService {

    @Resource
    private MemberDao memberDao;

    @Resource
    private DictService dictService;
    
    
    private static List<Member> All = new ArrayList<Member>();

    public void saveMember(Member member) {
        try {
            if (StringUtils.isEmpty(member.getID())) {
                member.setRegistDate(new Date());
                member.setFanCount(0);
                member.setAttentionCount(0);
                member.setInformationCount(0);
                member.setShareCount(0);
                member.setAttitudeCount(0);
                member.setCommentCount(0);
                //member.setStatusID(CDict.MemberStatusNormal.getID());
                //member.setGroupID(CDict.MemberGroupPartner.getID());
            }
            LogPrinter.info("getPickMembersgetPickMembersmember"+member );
            memberDao.saveOrUpdate(member);
        } catch (Exception e) {
            LogPrinter.error("saveMember" + e.getMessage());
        }
    }

    public Member getMemberByID(String strMemberID) {
		/*
		 * for (Member m : getAllMember()) { if (m.getID().equals(strMemberID))
		 * { LogPrinter.info("0000000000"+m.getDescription()); return
		 * extendMember(m); } }
		 */
        return extendMember(memberDao.findById(strMemberID));

    }

    public List<String> getMemberArtistsByID(String id) {
        List<String> allArtists = new ArrayList<String>();
        String[] allArtist = new String[0];
        Member member = getMemberByID(id);
        String artists = member.getArtists();
        if(!StringUtils.isEmpty(artists)){
            allArtist = StringUtils.split(",");
            for(int i=0;i<allArtist.length;i++){
                allArtists.add(allArtist[i]);
            }
        }
        return allArtists;
    }


    public void saveSpaceArtist(Member member) {
        try {
            memberDao.saveOrUpdate(member);
        } catch (Exception e) {
            LogPrinter.error("saveSpaceArtist" +e.getMessage());
        }
    }

    public String removeSapceArtists(String removedNames,String strMemberID) {
        if (removedNames.equals("")) {
            return ResourceHelper.getValue("Common_PleaseSelectDeletedOption");
        }
        Member space = getMemberByID(strMemberID);
        try {
            List<String> allArtists = this.getMemberArtistsByID(strMemberID);
            List<String> removeArtists = Arrays.asList(removedNames.split(","));
            allArtists.removeAll(removeArtists);
            String spaceArtists = "";
            for(String allArtist :allArtists){
                spaceArtists+= allArtist+",";
            }
            if(spaceArtists.length()>0){
                space.setArtists(spaceArtists.substring(0, spaceArtists.length()-1));
            }else{
                space.setArtists(spaceArtists);
            }
            saveMember(space);
            return Utility.RESULT_VALUE_OK;
        } catch (Exception e) {
            LogPrinter.error("removeSapceArtists" + e.getMessage());
            return e.getMessage();
        }
    }

    public List<Member> getAllMember() {
        if (All == null || All.size() == 0) {
            All = memberDao.findAllByClazz();
        }
        return All;
    }

    public List<Member> getMemberByKeyword(String strKeyword) {
        List<Member> list = new ArrayList<Member>();
        try {
            String hql = "FROM Member m WHERE m.Username LIKE :Keyword  OR m.Username LIKE :UpperCaseKeyword ORDER BY m.Username";
            Map<String,String> params=new HashMap<>();
            params.put("Keyword", "%" + strKeyword + "%");
            params.put("UpperCaseKeyword", "%" +strKeyword.toUpperCase() + "%");
            list= memberDao.findListByHQL(hql,params);
        } catch (Exception e) {
            LogPrinter.error("ss" + e.getMessage());
        }
        return list;
    }

    public List getMembers(int nPageIndex, int nPageSize) {
        return memberDao.findEntityByPage(nPageIndex, nPageSize);
    }

    public Member getMemberByUsername(String strUsername) {
        return this.extendMember( memberDao.findByProperty( "Username", strUsername));
    }

    public List<Member> getMembers(int nPageIndex, int nPageSize, String strKeyword, int searchGroupIDs,
                                   int searchStatusID, int searchIsRecommendID, String searchMemberID) {

        Map<String,String> params=new HashMap<>();

        if (searchMemberID != "") {
            params.put("searchMemberID", searchMemberID);
        }
        if (searchGroupIDs != -1) {
            params.put("searchGroupIDs", String.valueOf(searchGroupIDs));
        }
        if (searchStatusID != -1) {
            params.put("searchStatusID",String.valueOf(searchStatusID) );
        }
        //if (searchIsRecommendID != -1) {
        //	query.setInteger("searchIsRecommendID", searchIsRecommendID);
        //}
        params.put("Keyword", "%" + strKeyword + "%");

       String hql=getMembersQuery("m", strKeyword, searchGroupIDs, searchStatusID, searchIsRecommendID,
        searchMemberID);
        return  memberDao.findListPageByHQL(hql,params,nPageIndex,nPageSize);
    }

    private String getMembersQuery(String strChange, String strKeyword, int searchGroupIDs, int searchStatusID,
                                  int searchIsRecommendID, String searchMemberID) {
        String hql = "SELECT " + strChange
                + " FROM Member m WHERE (m.Username LIKE :Keyword OR m.Name LIKE :Keyword) ";

        if (searchMemberID != "") {
            hql += " AND m.ID= :searchMemberID";
        }

        if (searchGroupIDs != -1) {
            hql += " AND m.GroupID= :searchGroupIDs";
        }
        if (searchStatusID != -1) {
            hql += " AND m.StatusID= :searchStatusID";
        }
        //if (searchIsRecommendID != -1) {
        //	hql += " AND m.IsRecommendID= :searchIsRecommendID";
        //}
        hql += " ORDER BY m.GroupID ";
        return hql;
    }

    public List<Member> getPickMembers(String strKeyword) {

        List<Member> members=new ArrayList<>();
        try {
            String hql = "SELECT DISTINCT m FROM Member m WHERE  (m.Username LIKE :Keyword OR m.Mobile LIKE :Keyword OR m.Name LIKE :Keyword )  ";

            hql += " AND m.GroupID = :SearchGroupID";

            hql += " ORDER BY m.Username";

            Map<String,String> params=new HashMap<>();

            params.put("SearchGroupID", String.valueOf(CDict.MemberGroupPartner.getID()));
            params.put("Keyword","%" + strKeyword + "%");
            members=memberDao.findListByHQL(hql,params);
        } catch (Exception err) {
            LogPrinter.error("getPickMembers" + err.getMessage());
        }

        return members;
    }

    public long getMembersCount(String strKeyword, int searchGroupIDs, int searchStatusID, int searchIsRecommendID,
                                String searchMemberID) {
        long count = 0;
        try {
            String hql = this.getMembersQuery(" COUNT(*) ", strKeyword, searchGroupIDs, searchStatusID,
                    searchIsRecommendID, searchMemberID);
            Map<String,String> params=new HashMap<>();

            if (searchMemberID != "") {
                params.put("searchMemberID", searchMemberID);
            }
            if (searchGroupIDs != -1) {
                params.put("searchGroupIDs", String.valueOf(searchGroupIDs));
            }
            if (searchStatusID != -1) {
                params.put("searchStatusID",String.valueOf(searchStatusID) );
            }
            //if (searchIsRecommendID != -1) {
            //	query.setInteger("searchIsRecommendID", searchIsRecommendID);
            //}
            params.put("Keyword", "%" + strKeyword + "%");

           Long total= memberDao.findCountByHQL(hql,params);
            count=total.intValue();
        } catch (Exception e) {
            LogPrinter.error("getMembersCount" + e.getMessage());
        }
        return count;
    }

    public List<Member> getArtists(int nPageIndex, int nPageSize, int searchGroupIDs, int searchIsRecommendID,
                                   String searchSpaceID) {
        List<Member> list = new ArrayList<Member>();
        try {
            String queryHql = getArtistsQuery(" COUNT(*) ", searchGroupIDs, searchIsRecommendID, searchSpaceID);
            Map<String,String> params=new HashMap<>();
            if (searchGroupIDs != -1) {
                params.put("searchGroupIDs", String.valueOf(searchGroupIDs));
            }
            if (searchIsRecommendID != -1) {
                params.put("searchIsRecommendID", String.valueOf(searchIsRecommendID));
            }
            if (searchSpaceID != null && !searchSpaceID.equals("")) {
                params.put("SpaceID", String.valueOf(searchSpaceID));
            }
             list=memberDao.findListPageByHQL(queryHql,params,nPageIndex,nPageSize);
            for (Member member : list) {
                extendArtist(member);
            }
        } catch (Exception e) {
            LogPrinter.error("getMembers" + e.getMessage());
        }

        return list;
    }

    private Member extendArtist(Member member) {
        try {
            if (member != null) {
                member.setGroupName(dictService.getDictNameByID(member.getGroupID()));
                member.setStatusName(dictService.getDictNameByID(member.getStatusID()));
                member.setIsRecommendName(dictService.getDictNameByID(member.getIsRecommendID()));
                String imageID = member.getImageID();
//                String imgUrl = new AttachmentManager().getAttachmentByID(imageID).getFileNameInDisk();

                String recommendProductID = member.getRecommendProductID();
                String recommendProductImgUrl = "";
                String recommendProductName = "";

                member.setRecommendProductID(recommendProductID);
                member.setRecommendProductImgUrl(recommendProductImgUrl);
                member.setRecommendProductName(recommendProductName);
//                member.setIsAttention(new AttentionManager().isAttention(member.getID()));
//                member.setAttentionCount(new Long(new CountFormat().getCountFormat(new AttentionManager().getAttentionsByObjID(-1,-1,member.getID()).getCount())).intValue());
                member.setImageUrl("");
            }

        } catch (Exception e) {
            LogPrinter.info("extendMember" + e.getMessage());
        }
        return member;
    }

    public long getArtistsCount(int searchGroupIDs, int searchIsRecommendID, String searchSpaceID) {
        long count = 0;
        try {
            String queryHql = getArtistsQuery(" COUNT(*) ", searchGroupIDs, searchIsRecommendID, searchSpaceID);
            Map<String,String> params=new HashMap<>();
            if (searchGroupIDs != -1) {
                params.put("searchGroupIDs", String.valueOf(searchGroupIDs));
            }
            if (searchIsRecommendID != -1) {
                params.put("searchIsRecommendID", String.valueOf(searchIsRecommendID));
            }
            if (searchSpaceID != null && !searchSpaceID.equals("")) {
                params.put("SpaceID", String.valueOf(searchSpaceID));
            }
           Long total= memberDao.findCountByHQL(queryHql,params);
            count=total.intValue();
        } catch (Exception e) {
            LogPrinter.error("getMembersCount" + e.getMessage());
        }
        return count;
    }

    private String getArtistsQuery(String strChange, int searchGroupIDs, int searchIsRecommendID, String searchSpaceID) {
        String hql = "SELECT " + strChange + " FROM Member m WHERE m.StatusID = 8 ";
        if (searchGroupIDs != -1) {
            hql += " AND m.GroupID= :searchGroupIDs ";
        }
        if (searchIsRecommendID != -1) {
            hql += " AND m.IsRecommendID = :searchIsRecommendID ";
        }
        if (searchSpaceID != null && !searchSpaceID.equals("")) {
            hql += " AND m.SpaceID =:SpaceID ";
        }

        hql += " ORDER BY m.RegistDate DESC";

        return  hql;

    }

    public PagingData getArtistsByRecommend(int nPageIndex, int nPageSize, int searchIsRecommendID) {
        Map<String,String> params=new HashMap<>();
        params.put("searchIsRecommendID", String.valueOf(searchIsRecommendID));
        String listQuery=getArtistsByRecommendQuery(" m ",searchIsRecommendID);
        List<Member> list=memberDao.findListPageByHQL(listQuery,params,nPageIndex,nPageSize);
        String countQuery=getArtistsByRecommendQuery(" COUNT(*) ",searchIsRecommendID);
        Long total= memberDao.findCountByHQL(countQuery,params);
       long count=total.intValue();
        PagingData pagingData = new PagingData();
        pagingData.setCount(count);
        pagingData.setData(list);
        return pagingData;
    }


    private String getArtistsByRecommendQuery(String strChange, int searchIsRecommendID) {
        String hql = "SELECT " + strChange + " FROM Member m WHERE  m.IsRecommendID = :searchIsRecommendID";

        hql += " ORDER BY m.RegistDate DESC";

        return hql;
    }

    private Member extendMember(Member member) {
        try {
            if (member != null) {
//                member.setGroupName(dictService.getDictNameByID(member.getGroupID()));
//                member.setTypeName(dictService.getDictNameByID(member.getTypeID()));
                // member.setStatusName(dictService.getDictNameByID(member.getStatusID()));
                String imageID = member.getImageID();
                String imgUrl = ConfigUtil.getConfValueByKey("WEB_SITE")+"/img/"+ imageID+"/500/500";
                //String imgUrl =ConfigHelper.getContextParam().get("WEB_SITE")+"/upload/"+ new AttachmentManager().getAttachmentByID(imageID).getFileNameInDisk();
                if (member.getSpaceID() != null && !member.getSpaceID().equals("")) {
//                    member.setSpaceName(new MemberManager().getMemberNameByID(member.getSpaceID()));
                }
                member.setImageUrl(imgUrl);
//                member.setIsAttention(new AttentionManager().isAttention(member.getID()));
//                member.setFanCount(new Long(new AttentionManager().getAttentionsNoExtendByObjID(-1, -1, member.getID()).getCount()).intValue());
//                member.setAttentionCount(new Long(new AttentionManager().getAttentionMembersNoExtendByPubMemberID(-1, -1, member.getID()).getCount()).intValue());
//                member.setInformationCount(new Long(new ShareManager().getSharesCount("", CDict.Information.getID(), -1, member.getID(), -1, "", -1, -1,-1,-1,"",-1,"","")).intValue());
//                member.setShareCount(new Long(new ShareManager().getSharesCount("", CDict.Share.getID(), -1, member.getID(), -1, "", -1, -1,-1,-1,"",-1,"","")).intValue());
            }

        } catch (Exception e) {
            LogPrinter.info("extendMember" + e.getMessage());
        }
        return member;
    }

    public String login(String strUsername, String strPassword) {
        try {

            if (strUsername == null) {
                return ResourceHelper.Member_UsernameIsNull;
            }
            if (strPassword == null) {
                return ResourceHelper.Member_PasswordIsNull;
            }
            Member member = getMemberByUsername(strUsername);
            if (member == null) {
                return ResourceHelper.Common_UserNotExist;
            }
            if (!member.getPassword().equals(DEncrypt.md5(strPassword))) {
                return ResourceHelper.Member_PasswordNotMatch;
            }
            return Utility.RESULT_VALUE_OK;
        } catch (Exception err) {
            return "login:" + err.getMessage();
        }
    }
}
