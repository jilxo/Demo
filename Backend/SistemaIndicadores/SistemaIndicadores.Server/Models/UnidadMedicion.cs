using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("unidadmedicion")]
    public class UnidadMedicion
    {
        public int? id { get; set; }

        public string descripcion { get; set; }
    }
}
