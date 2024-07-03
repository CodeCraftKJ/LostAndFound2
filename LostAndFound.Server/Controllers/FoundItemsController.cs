using LostAndFound.Server.Data;
using LostAndFound.Server.Entities;
using LostAndFound.Server.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class FoundItemsController : ControllerBase
{
    private readonly IFoundItemRepository _foundItemRepository;

    public FoundItemsController(IFoundItemRepository foundItemRepository)
    {
        _foundItemRepository = foundItemRepository;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FoundItem>> GetFoundItem(int id)
    {
        var foundItem = await _foundItemRepository.GetFoundItemByIdAsync(id);
        if (foundItem == null)
        {
            return NotFound();
        }
        return foundItem;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FoundItem>>> GetFoundItems()
    {
        return Ok(await _foundItemRepository.GetFoundItemsAsync());
    }

    [HttpPost]
    public async Task<IActionResult> AddFoundItem(FoundItem foundItem)
    {
        await _foundItemRepository.AddFoundItemAsync(foundItem);
        return CreatedAtAction(nameof(GetFoundItem), new { id = foundItem.FoundItemID }, foundItem);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateFoundItem(int id, [FromBody] FoundItem foundItem)
    {
        if (id != foundItem.FoundItemID)
        {
            return BadRequest("ID in the URL does not match ID in the body.");
        }

        var existingItem = await _foundItemRepository.GetFoundItemByIdAsync(id);
        if (existingItem == null)
        {
            return NotFound("Found item not found.");
        }

        await _foundItemRepository.UpdateFoundItemAsync(foundItem);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFoundItem(int id)
    {
        await _foundItemRepository.DeleteFoundItemAsync(id);
        return NoContent();
    }
}
