using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizGame.Migrations
{
    /// <inheritdoc />
    public partial class Add_IsCorrectAnswer_And_Url : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AttachmentUrl",
                table: "Questions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IsCorrectAnswer",
                table: "Questions",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttachmentUrl",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "IsCorrectAnswer",
                table: "Questions");
        }
    }
}
