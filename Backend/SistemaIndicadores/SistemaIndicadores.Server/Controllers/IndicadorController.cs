using indicadores_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaIndicadores.Server.utils;

namespace indicadores_api.Server.Controllers
{
    [ApiController]
    [Route("rest/api/v1/[controller]")]
    public class IndicadorController : ControllerBase
    {
        private readonly MyDbContext _context;

        public IndicadorController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Indicador>> save(Indicador indicador)
        {
            _context.Indicadores.Add(indicador);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(findOne), new { id = indicador.id }, indicador);
        }

        [HttpPut]
        public async Task<ActionResult<Indicador>> update(Indicador indicador)
        {
            _context.Entry(indicador).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Available(indicador.id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(findOne), new { id = indicador.id }, indicador);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            var indicador = await _context.Indicadores.FindAsync(id);
            if (indicador == null)
            {
                return NotFound();
            }

            _context.Indicadores.Remove(indicador);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Indicador>> findOne(int id)
        {
            return await _context.Indicadores
                .Include(a => a.tipo)
                .Include(a => a.unidad)
                .Include(a => a.sentido)
                .Include(a => a.frecuencia)
                .Include(a => a.articulo)
                .Include(a => a.literal)
                .Include(a => a.numeral)
                .Include(a => a.paragrafo)
                .FirstOrDefaultAsync(a => a.id == id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Indicador>>> find()
        {
            return await _context.Indicadores
                .Include(a => a.tipo)
                .Include(a => a.unidad)
                .Include(a => a.sentido)
                .Include(a => a.frecuencia)
                .Include(a => a.articulo)
                .Include(a => a.literal)
                .Include(a => a.numeral)
                .Include(a => a.paragrafo)
                .ToListAsync();
        }

        [HttpPost("{id}/actor/{actorId}")]
        public async Task<IActionResult> saveResponsable(int id, string actorId)
        {
            _context.ResponsablesPorIndicador.Add(new ResponsablesPorIndicador(id, actorId));
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}/actor")]
        public async Task<IActionResult> deleteResponsables(int id)
        {
            var responsablesPorIndicador = await _context.ResponsablesPorIndicador
                                    .Where(x => x.fkidindicador == id)
                                    .ToListAsync();

            if (responsablesPorIndicador == null)
            {
                return NotFound();
            }

            _context.ResponsablesPorIndicador.RemoveRange(responsablesPorIndicador);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{id}/actor")]
        public async Task<ActionResult<IEnumerable<Actor>>> findResponsables(int id)
        {
            var ids = await _context.ResponsablesPorIndicador
                                    .Where(x => x.fkidindicador == id)
                                    .Select(x => x.fkidresponsable)
                                    .ToListAsync();

            return await _context.Actores
                                    .Where(a => ids.Contains(a.id))
                                    .ToListAsync();
        }

        [HttpPost("{id}/fuente/{fuenteId}")]
        public async Task<IActionResult> saveFuente(int id, int fuenteId)
        {
            _context.FuentesPorIndicador.Add(new FuentePorIndicador(id, fuenteId));
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}/fuente")]
        public async Task<IActionResult> deleteFuentes(int id)
        {
            var fuentesPorIndicador = await _context.FuentesPorIndicador
                                    .Where(x => x.fkidindicador == id)
                                    .ToListAsync();

            if (fuentesPorIndicador == null)
            {
                return NotFound();
            }

            _context.FuentesPorIndicador.RemoveRange(fuentesPorIndicador);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{id}/fuente")]
        public async Task<ActionResult<IEnumerable<Fuente>>> findFuentes(int id)
        {
            var ids = await _context.FuentesPorIndicador
                                    .Where(x => x.fkidindicador == id)
                                    .Select(x => x.fkidfuente)
                                    .ToListAsync();

            return await _context.Fuentes
                                    .Where(a => ids.Contains((int)a.id))
                                    .ToListAsync();
        }

        [HttpPost("{id}/represenVisual/{represenVisualId}")]
        public async Task<IActionResult> saveRepresenVisual(int id, int represenVisualId)
        {
            _context.RepresenVisualesPorIndicador.Add(new RepresenVisualPorIndicador(id, represenVisualId));
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}/represenVisual")]
        public async Task<IActionResult> deleteRepresenVisuales(int id)
        {
            var represenVisualesPorIndicador = await _context.RepresenVisualesPorIndicador
                                    .Where(x => x.fkidindicador == id)
                                    .ToListAsync();

            if (represenVisualesPorIndicador == null)
            {
                return NotFound();
            }

            _context.RepresenVisualesPorIndicador.RemoveRange(represenVisualesPorIndicador);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{id}/represenVisual")]
        public async Task<ActionResult<IEnumerable<RepresenVisual>>> findRepresenVisuales(int id)
        {
            var ids = await _context.RepresenVisualesPorIndicador
                                    .Where(x => x.fkidindicador == id)
                                    .Select(x => x.fkidrepresenvisual)
                                    .ToListAsync();

            return await _context.RepresenVisuales
                                    .Where(a => ids.Contains((int)a.id))
                                    .ToListAsync();
        }

        [HttpPost("{id}/variable/{variableId}/{dato}")]
        public async Task<IActionResult> saveVariable(int id, int variableId, double dato)
        {
            _context.VariablesPorIndicador.Add(new VariablePorIndicador(id, variableId, dato));
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}/variable")]
        public async Task<IActionResult> deleteVariables(int id)
        {
            var variablesPorIndicador = await _context.VariablesPorIndicador
                                    .Where(x => x.fkidindicador == id)
                                    .ToListAsync();

            if (variablesPorIndicador == null)
            {
                return NotFound();
            }

            _context.VariablesPorIndicador.RemoveRange(variablesPorIndicador);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{id}/variable")]
        public async Task<ActionResult<IEnumerable<VariablePorIndicador>>> findVariables(int id)
        {
            return await _context.VariablesPorIndicador
                                    .Where(x => x.fkidindicador == id)
                                    .Include(a => a.variable)
                                    .ToListAsync();
        }

        [HttpPost("{id}/resultado/{resultado}")]
        public async Task<IActionResult> saveResultado(int id, double resultado)
        {
            _context.ResultadosIndicador.Add(new ResultadoIndicador(id, resultado));
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}/resultado")]
        public async Task<IActionResult> deleteResultados(int id)
        {
            var resultadosPorIndicador = await _context.ResultadosIndicador
                                    .Where(x => x.fkidindicador == id)
                                    .ToListAsync();

            if (resultadosPorIndicador == null)
            {
                return NotFound();
            }

            _context.ResultadosIndicador.RemoveRange(resultadosPorIndicador);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{id}/resultado")]
        public async Task<ActionResult<IEnumerable<ResultadoIndicador>>> findResultados(int id)
        {
            return await _context.ResultadosIndicador
                                    .Where(x => x.fkidindicador == id)
                                    .ToListAsync();
        }

        private bool Available(int? id)
        {
            return (_context.Indicadores?.Any(x => x.id == id)).GetValueOrDefault();
        }
    }
}
