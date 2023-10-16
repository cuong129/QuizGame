using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizGame.Data;
using QuizGame.Models;
using QuizGame.Service.Questions;
using QuizGame.Service.Topics;

namespace QuizGame.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TopicController : ControllerBase
{
    private readonly ITopicService _topicService;

    public TopicController(ITopicService topicService)
    {
        _topicService = topicService;
    }

    [HttpGet("get-all")]
    public async Task<List<Topic>> GetAll()
    {
        return await _topicService.GetAll();
    }

    [HttpGet("{id}")]
    public async Task<TopicQuestionDto> GetTopicById(Guid id)
    {
        return await _topicService.GetTopicById(id);
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] TopicCreateDto topic)
    {
        var result = await _topicService.Create(topic);
        if (result == null)
            return BadRequest("Not enough question");
        return Ok(result);
    }

    [HttpPost("create-question-topic")] 
    public async Task<List<Question>> AddListQuestionToTopic([FromBody] TopicQuestionCreateDto topicQuestionCreateDto)
    {
        return await _topicService.AddListQuestionToTopic(topicQuestionCreateDto);
    }

    [HttpPost("random-question-topic")]
    public async Task<List<Question>> RandomQuestionTopic(Guid topicId, int numberQuestion)
    {
        return await _topicService.RandomQuestionTopic(topicId, numberQuestion);
    }

    [HttpDelete("delete-question-topic")]
    public async Task<IdentityResult> RemoveQuestionToTopic(Guid questionId)
    {
        return await _topicService.RemoveQuestionToTopic(questionId);
    }

    [HttpDelete("{id}")]
    public async Task<IdentityResult> Delete(Guid id)
    {
        return await _topicService.Delete(id);
    }
}
