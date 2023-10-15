using ExcelDataReader;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QuizGame.Data;
using System.Data;
using System.IO;
using System.Reflection.PortableExecutable;

namespace QuizGame.Service.Questions;

public class QuestionService : IQuestionService
{
    private readonly QuizGameDbContext _dbContext;
    public QuestionService(QuizGameDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Question>> GetAll()
    {
        try
        {
            var result = await _dbContext.Questions.ToListAsync();
            return result;
        }
        catch (Exception)
        {

            throw;
        }
    }

    public async Task<List<Question>> GetAvaliableQuestion(string schoolLevel, string type)
    {
        try
        {
            var result = await _dbContext.Questions
                .Where(x => x.SchoolLevel == schoolLevel && x.Type == type && x.TopicId == null).ToListAsync();
            return result;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<Question>> GetListQuestionByTopicId(Guid topicId)
    {
        try
        {
            var result = await _dbContext.Questions.Where(x => x.TopicId == topicId).ToListAsync();
            return result;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<IdentityResult> ImportExcelData(IFormFile excelFile)
    {
        try
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            var stream = new MemoryStream();
            excelFile.CopyTo(stream);
            using (var reader = ExcelReaderFactory.CreateReader(stream))
            {
                int rowNum = 0;

                do
                {
                    while (reader.Read())
                    {
                        rowNum++;

                        if (rowNum >= 2)
                        {
                            var question = new Question
                            {
                                Request = reader.GetString(1),
                                Answer = reader.GetString(2),
                                Type = reader.GetString(3),
                                SchoolLevel = reader.GetString(4),
                            };
                            await _dbContext.Questions.AddAsync(question);
                            await _dbContext.SaveChangesAsync();
                        }
                    }
                } while (reader.NextResult());
            }
            return IdentityResult.Success;
        }
        catch (Exception ex)
        {
            return IdentityResult.Failed(new IdentityError { Description = ex.Message});
        }
    }
}
