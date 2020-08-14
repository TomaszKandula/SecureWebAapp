using Xunit;
using FluentAssertions;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SecureWebApp.Logic;
using SecureWebApp.Models.Database;
using SecureWebApp.Extensions.AppLogger;
using Serilog;
using Serilog.Events;

namespace SecureWebApp.IntegrationTests
{

    public class Startup
    {
    }

    public class DbFixture
    {

        public ServiceProvider FServiceProvider { get; private set; }

        public DbFixture()
        {

            var LConfiguration = new ConfigurationBuilder().AddUserSecrets<DbFixture>().Build();
            var ConnectionString = LConfiguration.GetValue<string>("DbConnect");
            var LServices = new ServiceCollection();

            LServices.AddDbContext<MainDbContext>(Options => Options.UseSqlServer(ConnectionString), ServiceLifetime.Transient);
            LServices.AddSingleton<IAppLogger, AppLogger>();
            LServices.AddScoped<ILogicContext, LogicContext>();
            FServiceProvider = LServices.BuildServiceProvider();

        }

    }

    public class AjaxControllerTest : IClassFixture<DbFixture>
    {

        private readonly ServiceProvider FServiceProvider;
        
        private readonly MainDbContext   FMainDbContext;
        private readonly IAppLogger      FAppLogger;
        private readonly ILogicContext   FLogicContext;

        public AjaxControllerTest(DbFixture ADbFixture)
        {
            
            FServiceProvider = ADbFixture.FServiceProvider;
            
            FMainDbContext = FServiceProvider.GetService<MainDbContext>();
            FAppLogger     = FServiceProvider.GetService<IAppLogger>();
            FLogicContext  = FServiceProvider.GetService<ILogicContext>();

        }

        /* APPLOGGER CONFIG TESTS */

        [Fact]
        public void SeriLogConfig()
        {

            // Arrange
            var LogsPath = AppDomain.CurrentDomain.BaseDirectory + "\\test-logs";
            var FileName = $"log-{string.Format("{0:yyyyMMdd}", DateTime.Now)}.txt";

            if (!Directory.Exists(LogsPath))
            {
                Directory.CreateDirectory(LogsPath);
            }

            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Information()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Error)
                .Enrich.FromLogContext()
                .WriteTo.File
                (
                    LogsPath + "\\log-.txt",
                    outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}",
                    rollingInterval: RollingInterval.Day,
                    rollOnFileSizeLimit: true,
                    retainedFileCountLimit: null,
                    shared: false
                 )
                .CreateLogger();

            // Act
            FAppLogger.LogInfo("Integration Tests for SeriLog sitting behind AppLogger.");

            // Assert
            File.Exists(LogsPath + "\\" + FileName).Should().BeTrue();

        }

        /* TESTS FOR DATA RETRIEVAL */

        [Fact]
        public async Task GetUserList_Test()
        {
            
            var LResult = await FMainDbContext.Users
                .AsNoTracking()
                .Select(R => R)
                .ToListAsync();            
           
            LResult.Any().Should().BeTrue();


        }

        [Fact]
        public async Task GetCities_Test() 
        {

            var LResult = await FMainDbContext.Cities
                .AsNoTracking()
                .Select(R => R)
                .ToListAsync();

            LResult.Any().Should().BeTrue();

        }

        [Fact]
        public async Task GetCountries_Test() 
        {

            var LResult = await FMainDbContext.Countries
                .AsNoTracking()
                .Select(R => R)
                .ToListAsync();

            LResult.Any().Should().BeTrue();

        }

        [Fact]
        public async Task GetSigninHistory_Test() 
        {

            var LResult = await FMainDbContext.SigninHistory
                .AsNoTracking()
                .Select(R => R)
                .ToListAsync();

            LResult.Any().Should().BeTrue();

        }

        /* TESTS FOR DATA WRITING */

        [Theory]
        [InlineData(178, 80880)]
        public async Task TryToAddNewUser_Test(int ACountryId, int ACityId) 
        {

            // Arrange
            var Users = new Users() 
            { 
                FirstName   = "Bob",
                LastName    = "Dylan",
                NickName    = "Bob",
                EmailAddr   = "bob.dylan@gmail.com",
                PhoneNum    = null,
                Password    = "TestUnhashedPassword",
                CreatedAt   = DateTime.Now,
                IsActivated = false,
                CityId      = ACityId,
                CountryId   = ACountryId
            };

            // Act
            FMainDbContext.Users.Add(Users);
            await FMainDbContext.SaveChangesAsync();

            // Assert
            Users.Id.Should().BeGreaterThan(1);
        
        }

        [Theory]
        [InlineData(1)]
        public async Task TryToAddToSigninHistory_Test(int UserId)
        {

            // Arrange
            var SigninHistory = new SigninHistory() 
            { 
                UserId   = UserId,
                LoggedAt = DateTime.Now
            };

            // Act
            FMainDbContext.SigninHistory.Add(SigninHistory);
            await FMainDbContext.SaveChangesAsync();

            // Assert
            SigninHistory.Id.Should().BeGreaterThan(1);

        }

        /* GET FROM DATABASE AND CALL DNS LOOKUP */

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        public async Task CheckEmailDomain_Test(int UserId) 
        {

            // Arrange
            var LEmailAddress = (await FMainDbContext.Users
                .AsNoTracking()
                .Where(R => R.Id == UserId)
                .Select(R => R.EmailAddr)
                .ToListAsync())
                .Single();

            // Act
            var LResult = await FLogicContext.Emails.IsEmailDomainExist(LEmailAddress);

            // Assert
            LResult.Should().BeTrue();

        }

    }

}
