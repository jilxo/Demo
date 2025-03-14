using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class UnidadMedicionController : ControllerBase
    {
        private readonly MyDbContext _context;

        public UnidadMedicionController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<UnidadMedicion>> save(UnidadMedicion unidadMedicion)
        {
            _context.UnidadesMediciones.Add(unidadMedicion);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(findOne), new { id = unidadMedicion.id }, unidadMedicion);
        }

        [HttpPut]
        public async Task<ActionResult<UnidadMedicion>> update(UnidadMedicion unidadMedicion)
        {
            _context.Entry(unidadMedicion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Available(unidadMedicion.id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(findOne), new { id = unidadMedicion.id }, unidadMedicion);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            var unidadMedicion = await _context.UnidadesMediciones.FindAsync(id);
            if (unidadMedicion == null)
            {
                return NotFound();
            }

            _context.UnidadesMediciones.Remove(unidadMedicion);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UnidadMedicion>> findOne(int id)
        {
            return await _context.UnidadesMediciones.FindAsync(id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UnidadMedicion>>> find()
        {
            return await _context.UnidadesMediciones.ToListAsync();
        }

        private bool Available(int? id)
        {
            return (_context.UnidadesMediciones?.Any(x => x.id == id)).GetValueOrDefault();
        }
    }
}
