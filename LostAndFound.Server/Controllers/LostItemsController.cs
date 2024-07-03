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
    public class LostItemsController : ControllerBase
    {
        private readonly ILostItemRepository _lostItemRepository;
        private readonly IUserRepository _userRepository;

        public LostItemsController(ILostItemRepository lostItemRepository, IUserRepository userRepository)
        {
            _lostItemRepository = lostItemRepository;
            _userRepository = userRepository;
        }

        [HttpPost]
        public async Task<IActionResult> AddLostItem(LostItem lostItem)
        {
            try
            {
                var existingUser = await _userRepository.GetUserByEmailAsync(lostItem.User.Email);
                if (existingUser == null)
                {
                    var newUser = new User
                    {
                        UserName = lostItem.User.UserName,
                        Email = lostItem.User.Email
                    };

                    await _userRepository.AddUserAsync(newUser);

                    if (newUser.UserID <= 0)
                    {
                        return BadRequest("Failed to create user.");
                    }
                }

                await _lostItemRepository.AddLostItemAsync(lostItem);
                return CreatedAtAction(nameof(GetLostItem), new { id = lostItem.LostItemID }, lostItem);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
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
            var lostItems = await _lostItemRepository.GetLostItemsAsync();
            return Ok(lostItems);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLostItem(int id)
        {
            await _lostItemRepository.DeleteLostItemAsync(id);
            return NoContent();
        }
    }
}
