using Microsoft.AspNetCore.Identity;
using QuizGame.Data;
using QuizGame.Models;

namespace QuizGame.Service.Topics;

public interface ITopicService
{
    Task<Topic> Create(TopicDto topic, bool isRandom);
    Task<List<Topic>> GetAll();
    Task<List<Question>> RandomQuestionTopic(Guid topicId, int numberQuestion);
    Task<List<Question>> AddListQuestionToTopic(Guid topicId, List<Guid> questions);
    Task<IdentityResult> RemoveQuestionToTopic(Guid questionId);
}
