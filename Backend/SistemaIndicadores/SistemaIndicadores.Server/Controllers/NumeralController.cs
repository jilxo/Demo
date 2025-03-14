using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class NumeralController : ControllerBase
    {
        private readonly MyDbContext _context;

        public NumeralController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Numeral>> findOne(string id)
        {
            return await _context.Numerales.FindAsync(id); ;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Numeral>>> find(string? literalId)
        {
            if (literalId != null)
            {
                return await _context.Numerales
                                    .Where(n => n.fkidliteral == literalId)
                                    .ToListAsync();
            }

            return await _context.Numerales.ToListAsync();
        }

    }
}
