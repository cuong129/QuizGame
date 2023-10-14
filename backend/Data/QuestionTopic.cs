namespace QuizGame.Data;

public class QuestionTopic
{
    public QuestionTopic()
    {
        Id = Guid.NewGuid();
    }
    public Guid Id { get; set; }
    public Guid QuestionId { get; set; }
    public Guid TopicId { get; set; }
    public bool IsSubQuestion { get; set; }
}
