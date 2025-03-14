using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("resultadoindicador")]
    public class ResultadoIndicador
    {
        public ResultadoIndicador(int id, double? resultado, DateTime? fechacalculo, int fkidindicador)
        {
            this.id = id;
            this.resultado = resultado;
            this.fechacalculo = fechacalculo;
            this.fkidindicador = fkidindicador;
        }

        public ResultadoIndicador(int fkidindicador, Double resultado)
        {
            this.fkidindicador = fkidindicador;
            this.resultado = resultado;
            this.fechacalculo = DateTime.Now;
        }

        public int id { get; set; }

        public Double? resultado { get; set; }

        public DateTime? fechacalculo { get; set; }

        public int fkidindicador { get; set; }
    }
}
