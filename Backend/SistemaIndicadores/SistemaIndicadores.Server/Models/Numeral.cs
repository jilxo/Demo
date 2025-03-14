using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("numeral")]
    public class Numeral
    {
        public string id { get; set; }

        public string? descripcion { get; set; }

        public string fkidliteral { get; set; }
    }
}
