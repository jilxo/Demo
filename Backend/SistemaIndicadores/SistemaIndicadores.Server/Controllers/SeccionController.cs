using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class SeccionController : ControllerBase
    {
        private readonly MyDbContext _context;

        public SeccionController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Seccion>> findOne(string id)
        {
            return await _context.Secciones.FindAsync(id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Seccion>>> find()
        {
            return await _context.Secciones.ToListAsync();
        }

    }
}
