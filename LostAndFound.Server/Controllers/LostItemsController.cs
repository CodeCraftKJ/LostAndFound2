using LostAndFound.Server.Data;
using LostAndFound.Server.Entities;
using LostAndFound.Server.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class LostItemsController : ControllerBase
{
    private readonly ILostItemRepository _lostItemRepository;

    public LostItemsController(ILostItemRepository lostItemRepository)
    {
        _lostItemRepository = lostItemRepository;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<LostItem>> GetLostItem(int id)
    {
        var lostItem = await _lostItemRepository.GetLostItemByIdAsync(id);
        if (lostItem == null)
        {
            return NotFound();
        }
        return lostItem;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LostItem>>> GetLostItems()
    {
        return Ok(await _lostItemRepository.GetLostItemsAsync());
    }

    [HttpPost]
    public async Task<IActionResult> AddLostItem(LostItem lostItem)
    {
        await _lostItemRepository.AddLostItemAsync(lostItem);
        return CreatedAtAction(nameof(GetLostItem), new { id = lostItem.LostItemID }, lostItem);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateLostItem(int id, LostItem lostItem)
    {
        if (id != lostItem.LostItemID)
        {
            return BadRequest();
        }

        await _lostItemRepository.UpdateLostItemAsync(lostItem);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLostItem(int id)
    {
        await _lostItemRepository.DeleteLostItemAsync(id);
        return NoContent();
    }
}
