using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("tipoactor")]
    public class TipoActor
    {
        [Key]
        public int? id { get; set; }

        public string nombre { get; set; }
    }
}
