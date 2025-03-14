using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;
using System.Linq;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class RolUsuarioController : ControllerBase
    {
        private readonly MyDbContext _context;

        public RolUsuarioController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost("usuario/{email}/rol/{rolId}")]
        public async Task<IActionResult> save(string email, int rolId)
        {
            if (_context.RolUsuarios == null)
            {
                return NotFound();
            }

            _context.RolUsuarios.Add(new RolUsuario(email, rolId));
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("usuario/{email}/rol/{rolId}")]
        public async Task<IActionResult> delete(string email, int rolId)
        {
            if (_context.RolUsuarios == null)
            {
                return NotFound();
            }
            var rolUsuario = await _context.RolUsuarios
                .FirstOrDefaultAsync(ru => ru.fkemail == email && ru.fkidrol == rolId);

            if (rolUsuario == null)
            {
                return NotFound();
            }

            _context.RolUsuarios.Remove(rolUsuario);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("usuario/{email}")]
        public async Task<ActionResult<IEnumerable<Rol>>> find(string email)
        {
            if (_context.RolUsuarios == null)
            {
                return NotFound();
            }

            var ids = await _context.RolUsuarios
                                    .Where(ru => ru.fkemail == email)
                                    .Select(ru => ru.fkidrol)
                                    .ToListAsync();

            return await _context.Roles
                                    .Where(r => ids.Contains(r.id))
                                    .ToListAsync();
        }

    }
}
