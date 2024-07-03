using LostAndFound.Server.Entities;

namespace LostAndFound.Server.Repositories
{
    public interface ILostItemRepository
    {
        Task<LostItem> GetLostItemByIdAsync(int id);
        Task<IEnumerable<LostItem>> GetLostItemsAsync();
        Task AddLostItemAsync(LostItem lostItem);
        Task UpdateLostItemAsync(LostItem lostItem);
        Task DeleteLostItemAsync(int id);
    }
}
