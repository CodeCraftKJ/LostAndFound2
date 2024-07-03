using LostAndFound.Server.Entities;
using LostAndFound.Server.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LostAndFound.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoundItemsController : ControllerBase
    {
        private readonly IFoundItemRepository _foundItemRepository;
        private readonly IUserRepository _userRepository;

        public FoundItemsController(IFoundItemRepository foundItemRepository, IUserRepository userRepository)
        {
            _foundItemRepository = foundItemRepository;
            _userRepository = userRepository;
        }

        [HttpPost]
        public async Task<IActionResult> AddFoundItem(FoundItem foundItem)
        {
            try
            {
                var existingUser = await _userRepository.GetUserByEmailAsync(foundItem.User.Email);
                if (existingUser == null)
                {
                    var newUser = new User
                    {
                        UserName = foundItem.User.UserName,
                        Email = foundItem.User.Email
                    };

                    await _userRepository.AddUserAsync(newUser);

                    if (newUser.UserID <= 0)
                    {
                        return BadRequest("Failed to create user.");
                    }
                }

                await _foundItemRepository.AddFoundItemAsync(foundItem);
                return CreatedAtAction(nameof(GetFoundItem), new { id = foundItem.FoundItemID }, foundItem);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
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
            var foundItems = await _foundItemRepository.GetFoundItemsAsync();
            return Ok(foundItems);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFoundItem(int id)
        {
            await _foundItemRepository.DeleteFoundItemAsync(id);
            return NoContent();
        }
    }
}
