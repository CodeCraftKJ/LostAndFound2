using LostAndFound.Server.Data;
using LostAndFound.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace LostAndFound.Server.Repositories
{
    public class FoundItemRepository : IFoundItemRepository
    {
        private readonly AppDbContext _context;

        public FoundItemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<FoundItem> GetFoundItemByIdAsync(int id)
        {
            return await _context.FoundItems.FindAsync(id);
        }

        public async Task<IEnumerable<FoundItem>> GetFoundItemsAsync()
        {
            return await _context.FoundItems.ToListAsync();
        }

        public async Task AddFoundItemAsync(FoundItem foundItem)
        {
            _context.FoundItems.Add(foundItem);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateFoundItemAsync(FoundItem foundItem)
        {
            _context.FoundItems.Update(foundItem);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFoundItemAsync(int id)
        {
            var foundItem = await _context.FoundItems.FindAsync(id);
            if (foundItem != null)
            {
                _context.FoundItems.Remove(foundItem);
                await _context.SaveChangesAsync();
            }
        }
    }
}
