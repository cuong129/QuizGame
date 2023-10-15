using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QuizGame.Common;
using QuizGame.Data;
using QuizGame.Enums;
using QuizGame.Models;
using static System.Reflection.Metadata.BlobBuilder;

namespace QuizGame.Service.Topics;

public class TopicService : ITopicService
{
    private readonly QuizGameDbContext _dbContext;
    public TopicService(QuizGameDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Question>> AddListQuestionToTopic(Guid topicId, List<Guid> questions)
    {
        try
        {
            var result = new List<Question>();
            foreach (var questionId in questions)
            {
                var question = await _dbContext.Questions.SingleOrDefaultAsync(x => x.Id == questionId);
                question.TopicId = topicId;

                await _dbContext.SaveChangesAsync();
                result.Add(question);
            }

            return result;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<Topic?> Create(TopicCreateDto topicCreateDto)
    {
        try
        {
            var topicEntity = new Topic
            {
                Name = topicCreateDto.Name,
                Type = topicCreateDto.SchoolLevel
            };

            await _dbContext.Topics.AddAsync(topicEntity);

            if (topicCreateDto.IsRandom)
            {
                var questions = await _dbContext.Questions
                    .Where(x => x.TopicId == null && x.SchoolLevel == topicCreateDto.SchoolLevel && x.Type == FunctionCommon.GetEnumDescription(QuestionType.TracNghiem))
                    .ToListAsync();

                var random = new Random();

                var result = new List<Question>();

                var numberQuestion = 12;

                for (int i = 0; i < numberQuestion; i++)
                {
                    int randomIndex = random.Next(questions.Count);

                    if (!questions.Any())
                        return null;

                    questions[randomIndex].TopicId = topicEntity.Id;
                    result.Add(questions[randomIndex]);
                    questions.RemoveAt(randomIndex);
                }
                _dbContext.Questions.UpdateRange(result);
            };
            await _dbContext.SaveChangesAsync();

            return topicEntity;
        }
        catch (Exception)
        {
            return null;
        }
    }

    public async Task<List<Topic>> GetAll()
    {
        try
        {
            return await _dbContext.Topics.ToListAsync();
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<TopicQuestionDto> GetTopicById(Guid topicId)
    {
        try
        {
            var topic = await _dbContext.Topics.SingleOrDefaultAsync(x => x.Id == topicId);
            var listQuestion = await _dbContext.Questions.Where(x => x.TopicId == topicId).ToListAsync();
            var result = new TopicQuestionDto
            {
                Topic = topic,
                Questions = listQuestion
            };

            return result;
        }
        catch (Exception)
        {

            throw;
        }
    }

    public async Task<List<Question>> RandomQuestionTopic(Guid topicId, int numberQuestion)
    {
        try
        {
            var questions = await _dbContext.Questions.Where(x => x.TopicId == null).ToListAsync();

            Random random = new Random();

            List<Question> result = new List<Question>();

            for (int i = 0; i < numberQuestion; i++)
            {
                int randomIndex = random.Next(questions.Count);

                questions[randomIndex].TopicId = topicId;
                result.Add(questions[randomIndex]);
                questions.RemoveAt(randomIndex);
            }
            _dbContext.Questions.UpdateRange(result);
            await _dbContext.SaveChangesAsync();
            return result;
        }
        catch (Exception)
        {

            throw;
        }
    }

    public async Task<IdentityResult> RemoveQuestionToTopic(Guid questionId)
    {
        try
        {
            var question = await _dbContext.Questions.SingleOrDefaultAsync(x => x.Id == questionId);
            question.TopicId = null;

            await _dbContext.SaveChangesAsync();
            return IdentityResult.Success;
        }
        catch (Exception ex)
        {
            return IdentityResult.Failed(new IdentityError
            {
                Description = ex.Message
            });
        }
    }
}
