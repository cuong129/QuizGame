using Microsoft.AspNetCore.Identity;
using QuizGame.Data;

namespace QuizGame.Service.Questions;

public interface IQuestionService
{
    Task<IdentityResult> ImportExcelData(IFormFile excelFile);
    Task<List<Question>> GetAll();
    Task<List<Question>> GetAvaliableQuestion(string schoolLevel, string type);
    Task<List<Question>> GetListQuestionByTopicId(Guid topicId);
    Task<IdentityResult> Delete(Guid id);
}
