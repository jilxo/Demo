using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class ParagrafoController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ParagrafoController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Paragrafo>> findOne(string id)
        {
            return await _context.Paragrafos.FindAsync(id); ;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Paragrafo>>> find(string? articuloId)
        {
            if (articuloId != null)
            {
                return await _context.Paragrafos
                                    .Where(l => l.fkidarticulo == articuloId)
                                    .ToListAsync();
            }

            return await _context.Paragrafos.ToListAsync();
        }

    }
}
