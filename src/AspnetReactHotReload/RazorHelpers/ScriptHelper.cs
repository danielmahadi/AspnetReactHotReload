using System;
using Microsoft.AspNetCore.Html;

namespace AspnetReactHotReload.RazorHelpers
{
  public class ScriptHelper
  {
    public static HtmlString Script(string src)
    {
      var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

      var path = (env == "Development") ?
        string.Format("http://localhost:3000{0}", src)
        : src;

      return new HtmlString(string.Format("<script src=\"{0}\"></script>", path));
    }
  }
}
