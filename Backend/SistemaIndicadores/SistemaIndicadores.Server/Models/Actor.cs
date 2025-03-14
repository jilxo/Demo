using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("actor")]
    public class Actor
    {
        [Key]
        public string? id { get; set; }

        public string nombre { get; set; }

        public int fkidtipoactor { get; set; }

        [NotMapped]
        public TipoActor? tipo { get; set; }
    }
}
