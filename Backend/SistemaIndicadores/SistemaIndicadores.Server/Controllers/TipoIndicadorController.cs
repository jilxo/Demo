using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class TipoIndicadorController : ControllerBase
    {
        private readonly MyDbContext _context;

        public TipoIndicadorController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<TipoIndicador>> save(TipoIndicador tipoIndicador)
        {
            _context.TiposIndicadores.Add(tipoIndicador);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(findOne), new { id = tipoIndicador.id }, tipoIndicador);
        }

        [HttpPut]
        public async Task<ActionResult<TipoIndicador>> update(TipoIndicador tipoIndicador)
        {
            _context.Entry(tipoIndicador).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Available(tipoIndicador.id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(findOne), new { id = tipoIndicador.id }, tipoIndicador);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            var tipoIndicador = await _context.TiposIndicadores.FindAsync(id);
            if (tipoIndicador == null)
            {
                return NotFound();
            }

            _context.TiposIndicadores.Remove(tipoIndicador);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TipoIndicador>> findOne(int id)
        {
            return await _context.TiposIndicadores.FindAsync(id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoIndicador>>> find()
        {
            return await _context.TiposIndicadores.ToListAsync();
        }

        private bool Available(int? id)
        {
            return (_context.TiposIndicadores?.Any(x => x.id == id)).GetValueOrDefault();
        }
    }
}
