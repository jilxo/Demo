using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly MyDbContext _context;

        public UsuarioController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Usuario>> save(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(findOne), new { email = usuario.email }, usuario);
        }

        [HttpPut]
        public async Task<ActionResult<Usuario>> update(Usuario usuario)
        {
            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Available(usuario.email))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(findOne), new { email = usuario.email }, usuario);
        }

        [HttpDelete("{email}")]
        public async Task<IActionResult> delete(string email)
        {
            if (_context.Usuarios == null)
            {
                return NotFound();
            }
            var usuario = await _context.Usuarios.FindAsync(email);

            if (usuario == null)
            {
                return NotFound();
            }

            var rolUsuarios = await _context.RolUsuarios
                                    .Where(ru => ru.fkemail == email)
                                    .ToListAsync();

            if (rolUsuarios != null)
            {
                _context.RolUsuarios.RemoveRange(rolUsuarios);
                await _context.SaveChangesAsync();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<Usuario>> findOne(string email)
        {
            if (_context.Usuarios == null)
            {
                return NotFound();
            }
            var usuario = await _context.Usuarios.FindAsync(email);

            if (usuario == null)
            {
                return NotFound();
            }
            return usuario;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> find()
        {
            if (_context.Usuarios == null)
            {
                return NotFound();
            }
            return await _context.Usuarios.ToListAsync();
        }

        [HttpPost("auth")]
        public async Task<ActionResult<Usuario>> auth(Usuario usr)
        {
            if (_context.Usuarios == null)
            {
                return NotFound();
            }
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.email == usr.email && u.contrasena == usr.contrasena);

            if (usuario == null)
            {
                return NotFound();
            }
            return usuario;
        }

        private bool Available(string email)
        {
            return (_context.Usuarios?.Any(x => x.email == email)).GetValueOrDefault();
        }
    }
}
