using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("variablesporindicador")]
    public class VariablePorIndicador
    {
        public VariablePorIndicador(int fkidindicador, int fkidvariable, double dato)
        {
            this.fkidvariable = fkidvariable;
            this.fkidindicador = fkidindicador;
            this.dato = dato;
            this.fkemailusuario = "admin@empresa.com";
            this.fechadato = DateTime.Now;
        }

        public int id { get; set; }

        public int fkidvariable { get; set; }

        [NotMapped]
        public Variable? variable { get; set; }

        public int fkidindicador { get; set; }

        public Double dato { get; set; }

        public string fkemailusuario { get; set; }

        public DateTime fechadato { get; set; }
    }
}
