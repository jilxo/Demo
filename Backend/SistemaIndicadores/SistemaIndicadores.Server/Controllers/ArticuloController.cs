using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class ArticuloController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ArticuloController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Articulo>> findOne(string id)
        {
            return await _context.Articulos
                .Include(a => a.seccion)
                .Include(a => a.subseccion)
                .FirstOrDefaultAsync(a => a.id == id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Articulo>>> find()
        {
            return await _context.Articulos
                .Include(a => a.seccion)
                .Include(a => a.subseccion)
                .ToListAsync();
        }

    }
}
