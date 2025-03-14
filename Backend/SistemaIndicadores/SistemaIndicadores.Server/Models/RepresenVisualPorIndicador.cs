using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("represenvisualporindicador")]
    public class RepresenVisualPorIndicador
    {
        public RepresenVisualPorIndicador(int fkidindicador, int fkidrepresenvisual)
        {
            this.fkidindicador = fkidindicador;
            this.fkidrepresenvisual = fkidrepresenvisual;
        }

        public int fkidindicador { get; set; }

        public int fkidrepresenvisual { get; set; }
    }
}
