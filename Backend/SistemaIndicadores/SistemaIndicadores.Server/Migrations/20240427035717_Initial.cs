using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaIndicadores.Server.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "frecuencia",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_frecuencia", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "fuente",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_fuente", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "fuentesporindicador",
                columns: table => new
                {
                    fkidfuente = table.Column<int>(type: "int", nullable: false),
                    fkidindicador = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_fuentesporindicador", x => new { x.fkidfuente, x.fkidindicador });
                });

            migrationBuilder.CreateTable(
                name: "literal",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fkidarticulo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_literal", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "numeral",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fkidliteral = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_numeral", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "paragrafo",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fkidarticulo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_paragrafo", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "represenvisual",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_represenvisual", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "represenvisualporindicador",
                columns: table => new
                {
                    fkidindicador = table.Column<int>(type: "int", nullable: false),
                    fkidrepresenvisual = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_represenvisualporindicador", x => new { x.fkidindicador, x.fkidrepresenvisual });
                });

            migrationBuilder.CreateTable(
                name: "responsablesporindicador",
                columns: table => new
                {
                    fkidresponsable = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    fkidindicador = table.Column<int>(type: "int", nullable: false),
                    fechaasignacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_responsablesporindicador", x => new { x.fkidresponsable, x.fkidindicador });
                });

            migrationBuilder.CreateTable(
                name: "resultadoindicador",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    resultado = table.Column<double>(type: "float", nullable: true),
                    fechacalculo = table.Column<DateTime>(type: "datetime2", nullable: true),
                    fkidindicador = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_resultadoindicador", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "rol",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rol", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "rol_usuario",
                columns: table => new
                {
                    fkemail = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    fkidrol = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rol_usuario", x => new { x.fkemail, x.fkidrol });
                });

            migrationBuilder.CreateTable(
                name: "seccion",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_seccion", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sentido",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sentido", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "subseccion",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_subseccion", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tipoactor",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipoactor", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tipoindicador",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipoindicador", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "unidadmedicion",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_unidadmedicion", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "usuario",
                columns: table => new
                {
                    email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    contrasena = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuario", x => x.email);
                });

            migrationBuilder.CreateTable(
                name: "variable",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fechacreacion = table.Column<DateTime>(type: "datetime2", nullable: true),
                    fkemailusuario = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_variable", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "variablesporindicador",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    fkidvariable = table.Column<int>(type: "int", nullable: false),
                    fkidindicador = table.Column<int>(type: "int", nullable: false),
                    dato = table.Column<double>(type: "float", nullable: false),
                    fkemailusuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fechadato = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_variablesporindicador", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "articulo",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fkidseccion = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    fkidsubseccion = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_articulo", x => x.id);
                    table.ForeignKey(
                        name: "FK_articulo_seccion_fkidseccion",
                        column: x => x.fkidseccion,
                        principalTable: "seccion",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_articulo_subseccion_fkidsubseccion",
                        column: x => x.fkidsubseccion,
                        principalTable: "subseccion",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "actor",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fkidtipoactor = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_actor", x => x.id);
                    table.ForeignKey(
                        name: "FK_actor_tipoactor_fkidtipoactor",
                        column: x => x.fkidtipoactor,
                        principalTable: "tipoactor",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "indicador",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    codigo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    objetivo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    alcance = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    formula = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fkidtipoindicador = table.Column<int>(type: "int", nullable: false),
                    fkidunidadmedicion = table.Column<int>(type: "int", nullable: false),
                    meta = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fkidsentido = table.Column<int>(type: "int", nullable: false),
                    fkidfrecuencia = table.Column<int>(type: "int", nullable: false),
                    fkidarticulo = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    fkidliteral = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    fkidnumeral = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    fkidparagrafo = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_indicador", x => x.id);
                    table.ForeignKey(
                        name: "FK_indicador_articulo_fkidarticulo",
                        column: x => x.fkidarticulo,
                        principalTable: "articulo",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_indicador_frecuencia_fkidfrecuencia",
                        column: x => x.fkidfrecuencia,
                        principalTable: "frecuencia",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_indicador_literal_fkidliteral",
                        column: x => x.fkidliteral,
                        principalTable: "literal",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_indicador_numeral_fkidnumeral",
                        column: x => x.fkidnumeral,
                        principalTable: "numeral",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_indicador_paragrafo_fkidparagrafo",
                        column: x => x.fkidparagrafo,
                        principalTable: "paragrafo",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_indicador_sentido_fkidsentido",
                        column: x => x.fkidsentido,
                        principalTable: "sentido",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_indicador_tipoindicador_fkidtipoindicador",
                        column: x => x.fkidtipoindicador,
                        principalTable: "tipoindicador",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_indicador_unidadmedicion_fkidunidadmedicion",
                        column: x => x.fkidunidadmedicion,
                        principalTable: "unidadmedicion",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_actor_fkidtipoactor",
                table: "actor",
                column: "fkidtipoactor");

            migrationBuilder.CreateIndex(
                name: "IX_articulo_fkidseccion",
                table: "articulo",
                column: "fkidseccion");

            migrationBuilder.CreateIndex(
                name: "IX_articulo_fkidsubseccion",
                table: "articulo",
                column: "fkidsubseccion");

            migrationBuilder.CreateIndex(
                name: "IX_indicador_fkidarticulo",
                table: "indicador",
                column: "fkidarticulo");

            migrationBuilder.CreateIndex(
                name: "IX_indicador_fkidfrecuencia",
                table: "indicador",
                column: "fkidfrecuencia");

            migrationBuilder.CreateIndex(
                name: "IX_indicador_fkidliteral",
                table: "indicador",
                column: "fkidliteral");

            migrationBuilder.CreateIndex(
                name: "IX_indicador_fkidnumeral",
                table: "indicador",
                column: "fkidnumeral");

            migrationBuilder.CreateIndex(
                name: "IX_indicador_fkidparagrafo",
                table: "indicador",
                column: "fkidparagrafo");

            migrationBuilder.CreateIndex(
                name: "IX_indicador_fkidsentido",
                table: "indicador",
                column: "fkidsentido");

            migrationBuilder.CreateIndex(
                name: "IX_indicador_fkidtipoindicador",
                table: "indicador",
                column: "fkidtipoindicador");

            migrationBuilder.CreateIndex(
                name: "IX_indicador_fkidunidadmedicion",
                table: "indicador",
                column: "fkidunidadmedicion");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "actor");

            migrationBuilder.DropTable(
                name: "fuente");

            migrationBuilder.DropTable(
                name: "fuentesporindicador");

            migrationBuilder.DropTable(
                name: "indicador");

            migrationBuilder.DropTable(
                name: "represenvisual");

            migrationBuilder.DropTable(
                name: "represenvisualporindicador");

            migrationBuilder.DropTable(
                name: "responsablesporindicador");

            migrationBuilder.DropTable(
                name: "resultadoindicador");

            migrationBuilder.DropTable(
                name: "rol");

            migrationBuilder.DropTable(
                name: "rol_usuario");

            migrationBuilder.DropTable(
                name: "usuario");

            migrationBuilder.DropTable(
                name: "variable");

            migrationBuilder.DropTable(
                name: "variablesporindicador");

            migrationBuilder.DropTable(
                name: "tipoactor");

            migrationBuilder.DropTable(
                name: "articulo");

            migrationBuilder.DropTable(
                name: "frecuencia");

            migrationBuilder.DropTable(
                name: "literal");

            migrationBuilder.DropTable(
                name: "numeral");

            migrationBuilder.DropTable(
                name: "paragrafo");

            migrationBuilder.DropTable(
                name: "sentido");

            migrationBuilder.DropTable(
                name: "tipoindicador");

            migrationBuilder.DropTable(
                name: "unidadmedicion");

            migrationBuilder.DropTable(
                name: "seccion");

            migrationBuilder.DropTable(
                name: "subseccion");
        }
    }
}
