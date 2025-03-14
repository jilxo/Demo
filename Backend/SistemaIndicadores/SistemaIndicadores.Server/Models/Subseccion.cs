using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("subseccion")]
    public class Subseccion
    {
        public string id { get; set; }

        public string? nombre { get; set; }
    }
}
