using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("frecuencia")]
    public class Frecuencia
    {
        [Key]
        public int? id { get; set; }

        public string nombre { get; set; }
    }
}
