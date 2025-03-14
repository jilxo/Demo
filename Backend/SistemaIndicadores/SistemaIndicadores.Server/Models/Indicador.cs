using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("indicador")]
    public class Indicador
    {
        [Key]
        public int? id { get; set; }

        public string codigo { get; set; }

        public string nombre { get; set; }

        public string objetivo { get; set; }

        public string alcance { get; set; }

        public string formula { get; set; }

        public int fkidtipoindicador { get; set; }

        [NotMapped]
        public TipoIndicador? tipo { get; set; }

        public int fkidunidadmedicion { get; set; }

        [NotMapped]
        public UnidadMedicion? unidad { get; set; }

        public string meta { get; set; }

        public int fkidsentido { get; set; }

        [NotMapped]
        public Sentido? sentido { get; set; }

        public int fkidfrecuencia { get; set; }

        [NotMapped]
        public Frecuencia? frecuencia { get; set; }

        public string? fkidarticulo { get; set; }

        [NotMapped]
        public Articulo? articulo { get; set; }

        public string? fkidliteral { get; set; }

        [NotMapped]
        public Literal? literal { get; set; }

        public string? fkidnumeral { get; set; }

        [NotMapped]
        public Numeral? numeral { get; set; }

        public string? fkidparagrafo { get; set; }

        [NotMapped]
        public Paragrafo? paragrafo { get; set; }

    }
}
