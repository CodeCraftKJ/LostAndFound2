using LostAndFound.Server.Data;
using LostAndFound.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace LostAndFound.Server.Repositories
{
    public class LostItemRepository : ILostItemRepository
    {
        private readonly AppDbContext _context;

        public LostItemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<LostItem> GetLostItemByIdAsync(int id)
        {
            return await _context.LostItems.FindAsync(id);
        }

        public async Task<IEnumerable<LostItem>> GetLostItemsAsync()
        {
            return await _context.LostItems.ToListAsync();
        }

        public async Task AddLostItemAsync(LostItem lostItem)
        {
            _context.LostItems.Add(lostItem);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateLostItemAsync(LostItem lostItem)
        {
            _context.LostItems.Update(lostItem);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteLostItemAsync(int id)
        {
            var lostItem = await _context.LostItems.FindAsync(id);
            if (lostItem != null)
            {
                _context.LostItems.Remove(lostItem);
                await _context.SaveChangesAsync();
            }
        }
    }
}
