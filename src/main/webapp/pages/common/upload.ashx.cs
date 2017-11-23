using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using ChinSoft.Business;
using ChinSoft.Entity;
using ChinSoft.Core;

namespace ChinSoft.WebRoot
{
    /// <summary>
    /// UploadService 的摘要说明
    /// </summary>
    public class UploadService : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            HttpPostedFile file = context.Request.Files[0];
            string strDataID = context.Request.QueryString["dataid"];
            string strAttachmentID = context.Request.Form["id"];
            Attachment attachment = new AttachmentManager().SaveAttachment(file, strAttachmentID);
            attachment.hiddenID = strDataID;
            context.Response.ContentType = "text/plain";
            context.Response.Write(Utility.ObjectToJson(attachment));
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}