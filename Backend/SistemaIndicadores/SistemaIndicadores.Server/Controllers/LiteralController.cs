using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class LiteralController : ControllerBase
    {
        private readonly MyDbContext _context;

        public LiteralController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Literal>> findOne(string id)
        {
            return await _context.Literales.FindAsync(id); ;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Literal>>> find(string? articuloId)
        {
            if (articuloId != null)
            {
                return await _context.Literales
                                    .Where(l => l.fkidarticulo == articuloId)
                                    .ToListAsync();
            }

            return await _context.Literales.ToListAsync();
        }

    }
}
