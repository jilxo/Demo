using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class TipoActorController : ControllerBase
    {
        private readonly MyDbContext _context;

        public TipoActorController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<TipoActor>> save(TipoActor tipoActor)
        {
            _context.TiposActores.Add(tipoActor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(findOne), new { id = tipoActor.id }, tipoActor);
        }

        [HttpPut]
        public async Task<ActionResult<TipoActor>> update(TipoActor tipoActor)
        {
            _context.Entry(tipoActor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Available(tipoActor.id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(findOne), new { id = tipoActor.id }, tipoActor);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            var tipoActor = await _context.TiposActores.FindAsync(id);
            if (tipoActor == null)
            {
                return NotFound();
            }

            _context.TiposActores.Remove(tipoActor);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TipoActor>> findOne(int id)
        {
            return await _context.TiposActores.FindAsync(id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoActor>>> find()
        {
            return await _context.TiposActores.ToListAsync();
        }

        private bool Available(int? id)
        {
            return (_context.TiposActores?.Any(x => x.id == id)).GetValueOrDefault();
        }
    }
}
