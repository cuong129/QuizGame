using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizGame.Data;
using QuizGame.Models;
using QuizGame.Service.Questions;

namespace QuizGame.Controllers;

[Route("api/[controller]")]
[ApiController]
public class QuestionController : ControllerBase
{
    private readonly IQuestionService _questionService;

    public QuestionController(IQuestionService questionService)
    {
        _questionService = questionService;
    }

    [HttpGet("get-all")]
    public async Task<List<Question>> GetAll()
    {
        return await _questionService.GetAll();
    }

    [HttpGet("get-avaliable")]
    public async Task<List<Question>> GetAvaliableQuestion(string schoolLevel, string type)
    {
        return await _questionService.GetAvaliableQuestion(schoolLevel, type);
    }

    [HttpGet("get-question-by-id")]
    public async Task<List<Question>> GetListQuestionByTopicId(Guid topicId)
    {
        return await _questionService.GetListQuestionByTopicId(topicId);
    }

    [HttpPost("question-import")]
    public async Task<IdentityResult> ImportExcel(IFormFile excelFile)
    {
        return await _questionService.ImportExcelData(excelFile);
    }
}
