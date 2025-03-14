using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class VariableController : ControllerBase
    {
        private readonly MyDbContext _context;

        public VariableController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Variable>> save(Variable variable)
        {
            _context.Variables.Add(variable);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(findOne), new { id = variable.id }, variable);
        }

        [HttpPut]
        public async Task<ActionResult<Variable>> update(Variable variable)
        {
            _context.Entry(variable).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Available(variable.id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(findOne), new { id = variable.id }, variable);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            var variable = await _context.Variables.FindAsync(id);
            if (variable == null)
            {
                return NotFound();
            }

            _context.Variables.Remove(variable);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Variable>> findOne(int id)
        {
            return await _context.Variables.FindAsync(id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Variable>>> find()
        {
            return await _context.Variables.ToListAsync();
        }

        private bool Available(int? id)
        {
            return (_context.Variables?.Any(x => x.id == id)).GetValueOrDefault();
        }
    }
}
