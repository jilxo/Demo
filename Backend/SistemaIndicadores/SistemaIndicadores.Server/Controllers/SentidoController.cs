using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class SentidoController : ControllerBase
    {
        private readonly MyDbContext _context;

        public SentidoController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Sentido>> save(Sentido sentido)
        {
            _context.Sentidos.Add(sentido);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(findOne), new { id = sentido.id }, sentido);
        }

        [HttpPut]
        public async Task<ActionResult<Sentido>> update(Sentido sentido)
        {
            _context.Entry(sentido).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Available(sentido.id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(findOne), new { id = sentido.id }, sentido);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            var sentido = await _context.Sentidos.FindAsync(id);
            if (sentido == null)
            {
                return NotFound();
            }

            _context.Sentidos.Remove(sentido);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Sentido>> findOne(int id)
        {
            return await _context.Sentidos.FindAsync(id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sentido>>> find()
        {
            return await _context.Sentidos.ToListAsync();
        }

        private bool Available(int? id)
        {
            return (_context.Sentidos?.Any(x => x.id == id)).GetValueOrDefault();
        }
    }
}
