using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("fuentesporindicador")]
    public class FuentePorIndicador
    {
        public FuentePorIndicador(int fkidindicador, int fkidfuente)
        {
            this.fkidindicador = fkidindicador;
            this.fkidfuente = fkidfuente;
        }

        public int fkidfuente { get; set; }

        public int fkidindicador { get; set; }
    }
}
