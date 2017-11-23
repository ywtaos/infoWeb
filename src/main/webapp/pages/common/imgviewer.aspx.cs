using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ChinSoft.Core;
using ChinSoft.Business;
using ChinSoft.Entity;
using System.IO;

namespace ChinSoft.WebRoot.pages.common
{
    public partial class imgviewer : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var routeValues = this.Request.RequestContext.RouteData.Values;


            string strAttachmentID = Utility.ToSafeString(routeValues["id"]);
            int nWidth = Utility.ToSafeInt(routeValues["width"]);
            int nHeight = Utility.ToSafeInt(routeValues["height"]);

            if (string.IsNullOrEmpty(strAttachmentID))
            {
                throw new Exception();
            }

            Attachment attachment = new AttachmentManager().GetAttachmentByID(strAttachmentID);
            if (attachment == null)
            {
                //没有图片
                throw new Exception();
            }

            //context.Response.BufferOutput = true;
            //context.Response.ContentType = "image/jpeg";
            //context.Response.AddHeader("Content-Disposition", "inline;filename=" + System.Web.HttpUtility.UrlEncode(attachment.fileName, System.Text.Encoding.UTF8));
            //context.Response.ContentType = attachment.contentType;

            if (attachment.fileData != null)
            {
                using (MemoryStream imageStream = new MemoryStream(attachment.fileData))
                {
                    using (System.Drawing.Image imageSource = System.Drawing.Image.FromStream(imageStream, true))
                    {
                        //输出
                        Utility.WriteImageToWebPage(this.Context, imageSource, nWidth, nHeight);
                    }
                }
            }
            //context.Response.Write(Utility.ObjectToJson(attachment));
        }
    }
}