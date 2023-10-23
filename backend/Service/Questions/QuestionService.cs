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

    public async Task<IdentityResult> Delete(Guid id)
    {
        try
        {
            var question = await _dbContext.Questions.SingleOrDefaultAsync(x=> x.Id == id);
            _dbContext.Questions.Remove(question);
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
            var result = new List<Question>();
            if (type == "Vong1")
            {
                result = await _dbContext.Questions
                .Where(x => x.SchoolLevel == schoolLevel && x.Type == "TracNghiem" && x.TopicId == null).ToListAsync();
            }
            else
            {
                result = await _dbContext.Questions.Where(x => x.SchoolLevel == schoolLevel && x.Type == "BienBao" && x.TopicId == null).ToListAsync();
                if (!result.Any())
                {
                    result = await _dbContext.Questions.Where(x => x.SchoolLevel == schoolLevel && x.Type == "XuLyTinhHuong" && x.TopicId == null).ToListAsync();
                }
            }
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
                            var request = reader.GetString(0).Split(": ");
                            var question = new Question
                            {
                                Request = request.Length > 1 ? request[1] : request[0],
                                Answer = reader.GetString(1),
                                Type = reader.GetString(2),
                                SchoolLevel = reader.GetString(3),
                                CorrectAnswer = reader.GetString(4),
                                AttachmentUrl = reader.GetString(5),
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
