using System;
using Microsoft.AspNetCore.Mvc;

namespace AspnetReactHotReload.Controllers
{
  public class DefaultController : Controller
  {
    public ActionResult Index()
    {
      return View();
    }
  }
}
