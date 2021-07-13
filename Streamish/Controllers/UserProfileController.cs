
using Microsoft.AspNetCore.Mvc;
using System;
using Streamish.Repositories;
using Streamish.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Streamish.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _profileRepo;

        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _profileRepo = userProfileRepository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_profileRepo.GetAll());
        }
        //[HttpGet("{id}")]
        //public IActionResult Get(int id)
        //{
        //    var profile = _profileRepo.GetById(id);
        //    if (profile == null)
        //    {
        //        return NotFound();

        //    }
        //    return Ok(profile);
        //}

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var userProfile = _profileRepo.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _profileRepo.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpGet("GetVideosByUserProfileId/{id}")]
        public IActionResult GetByUserProfileId(int id)
        {
            var profile = _profileRepo.GetVideosByUserProfileId(id);
            if (profile == null)
            {
                return NotFound();
            }
            return Ok(profile);
        }
        [HttpPost]
        public IActionResult Post(UserProfile profile)
        {
            _profileRepo.Add(profile);
            return CreatedAtAction("Get", new { id = profile.Id }, profile);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile profile)
        {
            if (id !=profile.Id)
            {
                return BadRequest();
            }
            _profileRepo.Update(profile);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _profileRepo.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _profileRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
