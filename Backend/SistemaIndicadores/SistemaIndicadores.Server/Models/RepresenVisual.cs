using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("represenvisual")]
    public class RepresenVisual
    {
        public int? id { get; set; }

        public string nombre { get; set; }
    }
}
