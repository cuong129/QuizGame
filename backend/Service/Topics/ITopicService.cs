﻿using Microsoft.AspNetCore.Identity;
using QuizGame.Data;
using QuizGame.Models;

namespace QuizGame.Service.Topics;

public interface ITopicService
{
    Task<Topic> Create(TopicCreateDto topic);
    Task<List<Topic>> GetAll();
    Task<TopicQuestionDto> GetTopicById(Guid topicId);
    Task<List<Question>> RandomQuestionTopic(Guid topicId, int numberQuestion);
    Task<List<Question>> AddListQuestionToTopic(TopicQuestionCreateDto topicQuestionCreateDto);
    Task<IdentityResult> RemoveQuestionToTopic(Guid questionId);
    Task<IdentityResult> Delete(Guid id);
}
