using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("fuente")]
    public class Fuente
    {
        [Key]
        public int? id { get; set; }

        public string nombre { get; set; }
    }
}
