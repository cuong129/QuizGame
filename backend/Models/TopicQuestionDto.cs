using QuizGame.Data;

namespace QuizGame.Models;

public class TopicQuestionDto
{
    public Topic Topic { get; set; }
    public List<Question> Questions { get; set; }
}
