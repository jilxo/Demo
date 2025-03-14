using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("seccion")]
    public class Seccion
    {
        public string? id { get; set; }

        public string nombre { get; set; }
    }
}
