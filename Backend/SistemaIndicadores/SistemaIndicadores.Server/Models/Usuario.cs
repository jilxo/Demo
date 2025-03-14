using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace indicadores_api.Server.Models
{
    [Table("usuario")]
    public class Usuario
    {

        [Key]
        public string email { get; set; }

        public string? contrasena { get; set; }
    }
}
