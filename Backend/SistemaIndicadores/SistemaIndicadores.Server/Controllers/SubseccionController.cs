using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class SubseccionController : ControllerBase
    {
        private readonly MyDbContext _context;

        public SubseccionController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Subseccion>> findOne(string id)
        {
            if (_context.Subsecciones == null)
            {
                return NotFound();
            }
            var subseccion = await _context.Subsecciones.FindAsync(id);

            if (subseccion == null)
            {
                return NotFound();
            }
            return subseccion;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subseccion>>> find()
        {
            if (_context.Subsecciones == null)
            {
                return NotFound();
            }
            return await _context.Subsecciones.ToListAsync();
        }

    }
}
