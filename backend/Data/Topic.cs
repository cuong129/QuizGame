namespace QuizGame.Data;

public class Topic
{
    public Topic() => Id = Guid.NewGuid();

    public Guid Id { get; set; }
    public string Name { get; set; }
    public string SchoolLevel { get; set; }
    public string Type { get; set; }
}
