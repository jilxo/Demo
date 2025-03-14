using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("literal")]
    public class Literal
    {
        [Key]
        public string id { get; set; }

        public string descripcion { get; set; }

        public string fkidarticulo { get; set; }
    }
}
