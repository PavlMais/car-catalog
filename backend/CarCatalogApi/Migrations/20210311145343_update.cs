using Microsoft.EntityFrameworkCore.Migrations;

namespace Car_catalog.Migrations
{
    public partial class update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BrandId",
                table: "Models",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "BrandId1",
                table: "Models",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Models_BrandId1",
                table: "Models",
                column: "BrandId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Models_Brands_BrandId1",
                table: "Models",
                column: "BrandId1",
                principalTable: "Brands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Models_Brands_BrandId1",
                table: "Models");

            migrationBuilder.DropIndex(
                name: "IX_Models_BrandId1",
                table: "Models");

            migrationBuilder.DropColumn(
                name: "BrandId",
                table: "Models");

            migrationBuilder.DropColumn(
                name: "BrandId1",
                table: "Models");
        }
    }
}
