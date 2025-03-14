using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class RepresentacionVisualController : ControllerBase
    {
        private readonly MyDbContext _context;

        public RepresentacionVisualController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<RepresenVisual>> save(RepresenVisual representacionVisual)
        {
            _context.RepresenVisuales.Add(representacionVisual);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(findOne), new { id = representacionVisual.id }, representacionVisual);
        }

        [HttpPut]
        public async Task<ActionResult<RepresenVisual>> update(RepresenVisual representacionVisual)
        {
            _context.Entry(representacionVisual).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Available(representacionVisual.id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(findOne), new { id = representacionVisual.id }, representacionVisual);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            var represenVisual = await _context.RepresenVisuales.FindAsync(id);
            if (represenVisual == null)
            {
                return NotFound();
            }

            _context.RepresenVisuales.Remove(represenVisual);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RepresenVisual>> findOne(int id)
        {
            return await _context.RepresenVisuales.FindAsync(id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RepresenVisual>>> find()
        {
            return await _context.RepresenVisuales.ToListAsync();
        }

        private bool Available(int? id)
        {
            return (_context.RepresenVisuales?.Any(x => x.id == id)).GetValueOrDefault();
        }
    }
}
