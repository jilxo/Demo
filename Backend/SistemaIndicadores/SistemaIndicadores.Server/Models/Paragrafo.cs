using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("paragrafo")]
    public class Paragrafo
    {
        public string id { get; set; }

        public string descripcion { get; set; }

        public string fkidarticulo { get; set; }
    }
}
