﻿using LostAndFound.Server.Entities;

namespace LostAndFound.Server.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByIdAsync(int id);
        Task<IEnumerable<User>> GetUsersAsync();
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(int id);
    }
}
