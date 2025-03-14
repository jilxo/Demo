using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("articulo")]
    public class Articulo
    {
        [Key]
        public string id { get; set; }

        public string? nombre { get; set; }

        public string? descripcion { get; set; }

        public string fkidseccion { get; set; }

        [NotMapped]
        public Seccion? seccion { get; set; }

        public string fkidsubseccion { get; set; }

        [NotMapped]
        public Subseccion? subseccion { get; set; }

    }
}
