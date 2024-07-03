using LostAndFound.Server.Entities;

namespace LostAndFound.Server.Repositories
{
    public interface IFoundItemRepository
    {
        Task<FoundItem> GetFoundItemByIdAsync(int id);
        Task<IEnumerable<FoundItem>> GetFoundItemsAsync();
        Task AddFoundItemAsync(FoundItem foundItem);
        Task UpdateFoundItemAsync(FoundItem foundItem);
        Task DeleteFoundItemAsync(int id);
    }
}
