using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("variable")]
    public class Variable
    {
        public int? id { get; set; }

        public string nombre { get; set; }

        public DateTime? fechacreacion { get; set; }

        public string fkemailusuario { get; set; }
    }
}
