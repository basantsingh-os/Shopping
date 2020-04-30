using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user =new AppUser
                {
                    DisplayName = "bob",
                    Email ="bob@test.com",
                    UserName ="bob@test.com",
                    Address = new  Address
                    {
                        FirstName = "bob",
                        LastName ="singh",
                        Street = "10 dwowning street",
                        City = "London",
                        State = "London",
                        Zipcode = "32872"
                    }

                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}