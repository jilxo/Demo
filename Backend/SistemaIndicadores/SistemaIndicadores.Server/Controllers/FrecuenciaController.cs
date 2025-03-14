using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class FrecuenciaController : ControllerBase
    {
        private readonly MyDbContext _context;

        public FrecuenciaController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Frecuencia>> save(Frecuencia frecuencia)
        {
            _context.Frecuencias.Add(frecuencia);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(findOne), new { id = frecuencia.id }, frecuencia);
        }

        [HttpPut]
        public async Task<ActionResult<Frecuencia>> update(Frecuencia frecuencia)
        {
            _context.Entry(frecuencia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Available(frecuencia.id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(findOne), new { id = frecuencia.id }, frecuencia);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            var frecuencia = await _context.Frecuencias.FindAsync(id);
            if (frecuencia == null)
            {
                return NotFound();
            }

            _context.Frecuencias.Remove(frecuencia);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Frecuencia>> findOne(int id)
        {
            return await _context.Frecuencias.FindAsync(id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Frecuencia>>> find()
        {
            return await _context.Frecuencias.ToListAsync();
        }

        private bool Available(int? id)
        {
            return (_context.Frecuencias?.Any(x => x.id == id)).GetValueOrDefault();
        }
    }
}
