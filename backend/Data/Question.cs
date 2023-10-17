namespace QuizGame.Data;

public class Question
{
    public Question() => Id = Guid.NewGuid();

    public Guid Id { get; set; }
    public string Request { get; set; }
    public string? Answer { get; set; }
    public string? AttachmentUrl { get; set; }
    public string? CorrectAnswer { get; set; }
    public string Type { get; set; }
    public string SchoolLevel { get; set; }
    public Guid? TopicId { get; set; }
}
