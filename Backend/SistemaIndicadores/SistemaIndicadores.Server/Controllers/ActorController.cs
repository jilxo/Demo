using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class ActorController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ActorController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Actor>> save(Actor actor)
        {
            actor.id = $"{DateTime.Now.Ticks}";
            _context.Actores.Add(actor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(findOne), new { id = actor.id }, actor);
        }

        [HttpPut]
        public async Task<ActionResult<Actor>> update(Actor actor)
        {
            _context.Entry(actor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Available(actor.id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(findOne), new { id = actor.id }, actor);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(string id)
        {
            var actor = await _context.Actores.FindAsync(id);

            if (actor == null)
            {
                return NotFound();
            }

            _context.Actores.Remove(actor);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Actor>> findOne(string id)
        {
            var actor = await _context.Actores
                .Include(a => a.tipo)
                .FirstOrDefaultAsync(a => a.id == id);

            if (actor == null)
            {
                return NotFound();
            }

            return actor;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Actor>>> find()
        {
            return await _context.Actores.Include(a => a.tipo).ToListAsync();
        }

        private bool Available(string id)
        {
            return (_context.Actores?.Any(x => x.id == id)).GetValueOrDefault();
        }
    }
}
