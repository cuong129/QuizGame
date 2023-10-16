namespace QuizGame.Models;

public class TopicQuestionCreateDto
{
    public Guid TopicId { get; set; }
    public List<Guid> QuestionIds { get; set; }
}
