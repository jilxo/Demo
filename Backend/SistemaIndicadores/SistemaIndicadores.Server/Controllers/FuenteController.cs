using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class FuenteController : ControllerBase
    {
        private readonly MyDbContext _context;

        public FuenteController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Fuente>> save(Fuente fuente)
        {
            _context.Fuentes.Add(fuente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(findOne), new { id = fuente.id }, fuente);
        }

        [HttpPut]
        public async Task<ActionResult<Fuente>> update(Fuente fuente)
        {
            _context.Entry(fuente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Available(fuente.id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(findOne), new { id = fuente.id }, fuente);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            var fuente = await _context.Fuentes.FindAsync(id);
            if (fuente == null)
            {
                return NotFound();
            }

            _context.Fuentes.Remove(fuente);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Fuente>> findOne(int id)
        {
            return await _context.Fuentes.FindAsync(id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fuente>>> find()
        {
            return await _context.Fuentes.ToListAsync();
        }

        private bool Available(int? id)
        {
            return (_context.Fuentes?.Any(x => x.id == id)).GetValueOrDefault();
        }
    }
}
