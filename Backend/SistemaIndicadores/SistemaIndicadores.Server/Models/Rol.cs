using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("rol")]
    public class Rol
    {
        [Key]
        public int id { get; set; }

        public string? nombre { get; set; }
    }
}
