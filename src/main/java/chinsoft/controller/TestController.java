package chinsoft.controller;

import chinsoft.entity.Member;
import chinsoft.service.MemberService;
import chinsoft.util.DEncrypt;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author xutao
 * @version V1.0 创建时间：2017/11/20 14:29
 *          Copyright 2017 by 言午工作室
 */
@RestController
@RequestMapping("/test")
public class TestController {

    @Resource
    private MemberService memberService;

    @RequestMapping(value = "/test", method = RequestMethod.GET, produces = {"application/json", "application/xml"})
    public String test(){

       try {
           Member member=new Member();
           member.setName("張三");
           member.setUsername("test");
           member.setCompany("合法");
           String pwd= DEncrypt.md5("123456");
           member.setPassword(pwd);
           memberService.saveMember(member);
       }catch (Exception ex){
           ex.printStackTrace();
       }

        return "你好，大千世界";
    }
}
