using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("tipoindicador")]
    public class TipoIndicador
    {
        [Key]
        public int? id { get; set; }

        public string nombre { get; set; }
    }
}
