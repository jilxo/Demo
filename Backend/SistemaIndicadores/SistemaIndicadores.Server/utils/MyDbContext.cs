using indicadores_api.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace SistemaIndicadores.Server.utils
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<Rol> Roles { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<RolUsuario> RolUsuarios { get; set; }
        public DbSet<Actor> Actores { get; set; }
        public DbSet<Articulo> Articulos { get; set; }
        public DbSet<Fuente> Fuentes { get; set; }
        public DbSet<Frecuencia> Frecuencias { get; set; }
        public DbSet<FuentePorIndicador> FuentesPorIndicador { get; set; }
        public DbSet<Indicador> Indicadores { get; set; }
        public DbSet<Literal> Literales { get; set; }
        public DbSet<Numeral> Numerales { get; set; }
        public DbSet<Paragrafo> Paragrafos { get; set; }
        public DbSet<RepresenVisual> RepresenVisuales { get; set; }
        public DbSet<RepresenVisualPorIndicador> RepresenVisualesPorIndicador { get; set; }
        public DbSet<ResponsablesPorIndicador> ResponsablesPorIndicador { get; set; }
        public DbSet<ResultadoIndicador> ResultadosIndicador { get; set; }
        public DbSet<Seccion> Secciones { get; set; }
        public DbSet<Sentido> Sentidos { get; set; }
        public DbSet<Subseccion> Subsecciones { get; set; }
        public DbSet<TipoActor> TiposActores { get; set; }
        public DbSet<TipoIndicador> TiposIndicadores { get; set; }
        public DbSet<UnidadMedicion> UnidadesMediciones { get; set; }
        public DbSet<Variable> Variables { get; set; }
        public DbSet<VariablePorIndicador> VariablesPorIndicador { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<RolUsuario>().HasKey(e => new { e.fkemail, e.fkidrol });
            modelBuilder.Entity<Actor>().HasOne(a => a.tipo).WithMany().HasForeignKey(a => a.fkidtipoactor);
            modelBuilder.Entity<Articulo>().HasOne(a => a.seccion).WithMany().HasForeignKey(a => a.fkidseccion);
            modelBuilder.Entity<Articulo>().HasOne(a => a.subseccion).WithMany().HasForeignKey(a => a.fkidsubseccion);
            modelBuilder.Entity<Indicador>().HasOne(i => i.tipo).WithMany().HasForeignKey(a => a.fkidtipoindicador);
            modelBuilder.Entity<Indicador>().HasOne(i => i.unidad).WithMany().HasForeignKey(a => a.fkidunidadmedicion);
            modelBuilder.Entity<Indicador>().HasOne(i => i.sentido).WithMany().HasForeignKey(a => a.fkidsentido);
            modelBuilder.Entity<Indicador>().HasOne(i => i.frecuencia).WithMany().HasForeignKey(a => a.fkidfrecuencia);
            modelBuilder.Entity<Indicador>().HasOne(i => i.articulo).WithMany().HasForeignKey(a => a.fkidarticulo);
            modelBuilder.Entity<Indicador>().HasOne(i => i.literal).WithMany().HasForeignKey(a => a.fkidliteral);
            modelBuilder.Entity<Indicador>().HasOne(i => i.numeral).WithMany().HasForeignKey(a => a.fkidnumeral);
            modelBuilder.Entity<Indicador>().HasOne(i => i.paragrafo).WithMany().HasForeignKey(a => a.fkidparagrafo);
            modelBuilder.Entity<FuentePorIndicador>().HasKey(e => new { e.fkidfuente, e.fkidindicador });
            modelBuilder.Entity<RepresenVisualPorIndicador>().HasKey(e => new { e.fkidindicador, e.fkidrepresenvisual });
            modelBuilder.Entity<ResponsablesPorIndicador>().HasKey(e => new { e.fkidresponsable, e.fkidindicador });
            modelBuilder.Entity<VariablePorIndicador>().HasOne(a => a.variable).WithMany().HasForeignKey(a => a.fkidvariable);

        }
    }
}
