using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("responsablesporindicador")]
    public class ResponsablesPorIndicador
    {
        public ResponsablesPorIndicador(int fkidindicador, string fkidresponsable)
        {
            this.fkidindicador = fkidindicador;
            this.fkidresponsable = fkidresponsable;
            this.fechaasignacion = DateTime.Now;
        }

        public string fkidresponsable { get; set; }

        public int fkidindicador { get; set; }

        public DateTime fechaasignacion { get; set; }
    }
}
