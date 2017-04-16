using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace AspNetCore1.Controllers
{
    public class HomeController : Controller
    {
        readonly IFileProvider _provider;

        public HomeController(IFileProvider provider)
        {
            _provider = provider;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
