using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using QuizGame.Models;
using QuizGame.Service.Questions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace QuizGame.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IConfiguration _configuration;
    private readonly IQuestionService _questionService;

    public AuthController(SignInManager<IdentityUser> signInManager, 
        UserManager<IdentityUser> userManager, 
        IConfiguration configuration,
        IQuestionService questionService)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _configuration = configuration;
        _questionService = questionService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginModel model)
    {
        var user = await _userManager.FindByNameAsync(model.UserName);

        if (user == null)
        {
            return BadRequest("Invalid username or password");
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

        if (result.Succeeded)
        {
            // Tạo mã thông báo JWT (nếu sử dụng)
            // Trả về mã thông báo hoặc thông tin người dùng đã đăng nhập
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            // Thêm các claims tùy chỉnh khác tại đây nếu cần
        };

            var token = new JwtSecurityToken(
                claims: claims,
                signingCredentials: credentials
            );

            var accessToken = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(accessToken);
        }

        return BadRequest("Invalid username or password");
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterModel model)
    {
        var user = new IdentityUser
        {
            UserName = model.UserName
        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            // Đăng nhập người dùng sau khi đăng ký thành công (nếu cần)
        }

        return Ok(result.Errors);
    }
}
