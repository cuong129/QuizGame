using System.ComponentModel;

namespace QuizGame.Enums;

public enum QuestionType
{
    [Description("TracNghiem")]
    TracNghiem = 0,
    [Description("GioiThieu")]
    GioiThieu = 1,
    [Description("BienBao")]
    BienBao = 2,
    [Description("VanDong")]
    VanDong = 3,
    [Description("XuLyTinhHuong")]
    XuLyTinhHuong = 4
}