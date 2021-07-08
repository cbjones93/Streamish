using Streamish.Controllers;
using Streamish.Models;
using Streamish.Tests.Mocks;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;


namespace Streamish.Tests
{
   public class UserProfileControllerTests
    {
        [Fact]
        public void Get_Returns_All_User_Profiles()
        {
            // Arrange 
            var profileCount = 20;
            var profiles = CreateTestUserProfiles(profileCount);

            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            // Act 
            var result = controller.Get();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualProfiles = Assert.IsType<List<UserProfile>>(okResult.Value);

            Assert.Equal(profileCount, actualProfiles.Count);
            Assert.Equal(profiles, actualProfiles);
        }


        [Fact]
        public void Get_By_Id_Returns_NotFound_When_Given_Unknown_id()
        {
            //Arrange
            var profiles = new List<UserProfile>(); // no profiles

            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            //Act
            var result = controller.Get(1);

            //Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Get_By_Id_Returns_Profile_With_Given_Id()
        {
            //Arrange
            var testProfileId = 99;
            var profiles = CreateTestUserProfiles(5);
            profiles[0].Id = testProfileId; // Make sure we know the Id of one of the profiles

            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            //Act
            var result = controller.Get(testProfileId);

            //Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualProfile = Assert.IsType<UserProfile>(okResult.Value);

            Assert.Equal(testProfileId, actualProfile.Id);
        }

        [Fact]
        public void Post_Method_Adds_A_New_Profile()
        {
            //Arrange
            var profileCount = 20;
            var profiles = CreateTestUserProfiles(profileCount);

            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            //Act
            var newProfile = new UserProfile()
            {
                Name = "Name",
                Email = "Email",
                ImageUrl = "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnVubnklMjBwb3J0cmFpdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
                DateCreated = DateTime.Today,
            };
            controller.Post(newProfile);

            //Assert 
            Assert.Equal(profileCount + 1, repo.InternalData.Count);
        }

        [Fact]
        public void Put_Method_Returns_BadRequest_When_Ids_Do_Not_Match()
        {
            //Arrange
            var testProfileId = 99;
            var profiles = CreateTestUserProfiles(5);
            profiles[0].Id = testProfileId; // Make sure we know the Id of one of the profiles

            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            var profilesToUpdate = new UserProfile()
            {
                Id  = testProfileId,
                Email= "Updated!",
                ImageUrl = "http://some.url",
                DateCreated = DateTime.Today,
            };
            var someOtherProfileId = testProfileId + 1;  // make sure they aren't the same

            //Act
            var result = controller.Put(someOtherProfileId, profilesToUpdate);

            //Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public void Put_Method_Updates_A_Profile()
        {
            //Arrange
            var testProfileId = 99;
            var profiles = CreateTestUserProfiles(5);
            profiles[0].Id = testProfileId; // Make sure we know the Id of one of the profiles

            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            var profileToUpdate = new UserProfile()
            {
                Id = testProfileId,
                Name = "Updated!",
                Email = "Updated!",
                ImageUrl = "http://some.url",
                DateCreated = DateTime.Today,
            };

            //Act
            controller.Put(testProfileId, profileToUpdate);

            //Assert
            var profileFromDb = repo.InternalData.FirstOrDefault(p => p.Id == testProfileId);
            Assert.NotNull(profileFromDb);
            Assert.Equal(profileToUpdate.Name, profileFromDb.Name);
            Assert.Equal(profileToUpdate.Email, profileFromDb.Email);
            Assert.Equal(profileToUpdate.ImageUrl, profileFromDb.ImageUrl);
            Assert.Equal(profileToUpdate.DateCreated, profileFromDb.DateCreated);

        }
        [Fact]
        public void Delete_Method_Removes_A_Profile()
        {
            //Arrange
            var testProfileId = 99;
            var profiles = CreateTestUserProfiles(5);
            profiles[0].Id = testProfileId;  // Make sure we know the Id of one of the profiles

            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            //Act
            controller.Delete(testProfileId);

            //Assert
            var profileFromDb = repo.InternalData.FirstOrDefault(p => p.Id == testProfileId);
            Assert.Null(profileFromDb);
        }

        private List<UserProfile> CreateTestUserProfiles(int count)
        {
            var profiles = new List<UserProfile>();
            for (var i = 1; i<= count; i++)
            {
                profiles.Add(new UserProfile()
                {
                    Id = i,
                    Name = $"Name {i}",
                    Email = $"Email {i}",
                    ImageUrl = $"http://user.url/{i}",
                    DateCreated = DateTime.Today.AddDays(-i),
                });
            }
            return profiles;
        }
    }
}
