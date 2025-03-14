using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("sentido")]
    public class Sentido
    {
        public int? id { get; set; }

        public string nombre { get; set; }
    }
}
