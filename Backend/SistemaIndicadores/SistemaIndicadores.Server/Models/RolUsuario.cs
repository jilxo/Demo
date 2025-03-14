using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace indicadores_api.Server.Models
{
    [Table("rol_usuario")]
    public class RolUsuario
    {
        public RolUsuario(string fkemail, int fkidrol)
        {
            this.fkemail = fkemail;
            this.fkidrol = fkidrol;
        }

        public string fkemail { get; set; }

        public int fkidrol { get; set; }
    }
}
