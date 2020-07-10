﻿using System;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SecureWebApp.Helpers;
using SecureWebApp.Models.Json;
using SecureWebApp.Models.Views;
using SecureWebApp.Models.Database;
using SecureWebApp.Extensions.AppLogger;
using SecureWebApp.Extensions.DnsLookup;
using System.Collections.Generic;
using SecureWebApp.Extensions.BCrypt;

namespace SecureWebApp.Controllers
{

    [Route("api/v1/[controller]")]
    [ApiController]
    [ResponseCache(CacheProfileName = "ResponseCache")]
    public class AjaxController : Controller
    {

        private readonly IAppLogger    FAppLogger;
        private readonly MainDbContext FMainDbContext;
        private readonly IDnsLookup    FDnsLookup;

        public AjaxController(
            IAppLogger    AAppLogger,
            MainDbContext AMainDbContext,
            IDnsLookup    ADnsLookup
        )
        {
            FAppLogger     = AAppLogger;
            FMainDbContext = AMainDbContext;
            FDnsLookup     = ADnsLookup;
        }

        /// <summary>
        /// Parse given email address using MailAddress class provided in NET Core.
        /// This is alternative approach to classic RegEx.
        /// </summary>
        /// <param name="AEmailAddress"></param>
        /// <returns></returns>
        public bool IsEmailAddressCorrect(string AEmailAddress)
        {
            try
            {
                var LEmailAddress = new MailAddress(AEmailAddress);
                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }

        /// <summary>
        /// Check if given email address aready exists.
        /// </summary>
        /// <param name="AEmailAddress"></param>
        /// <returns></returns>
        public async Task<bool> IsEmailAddressExist(string AEmailAddress) 
        {

            var LEmailList = await FMainDbContext.Users
                .AsNoTracking()
                .Where(R => R.EmailAddr == AEmailAddress)
                .Select(R => R.EmailAddr)
                .ToListAsync();

            return LEmailList.Any();

        }

        /// <summary>
        /// Endpoint validating supplied email address. It checks format and email domain, and if it is already registered in database.
        /// </summary>
        /// <param name="EmailAddress"></param>
        /// <returns></returns>
        // GET api/v1/ajax/validation/{emailaddress}/
        [ValidateAntiForgeryToken]
        [HttpGet("validation/{emailaddress}")]
        public async Task<IActionResult> CheckEmailAsync(string EmailAddress)
        {

            var LResponse = new EmailValidation();
            try 
            {

                if (!IsEmailAddressCorrect(EmailAddress)) 
                {
                    LResponse.Error.ErrorCode = Constants.Errors.EmailAddressMalformed.ErrorCode;
                    LResponse.Error.ErrorDesc = Constants.Errors.EmailAddressMalformed.ErrorDesc;
                    FAppLogger.LogWarn(string.Format("GET api/v1/ajax/validation/{0}. {1}.", EmailAddress, LResponse.Error.ErrorDesc));
                    return StatusCode(200, LResponse);
                }
               
                if (await IsEmailAddressExist(EmailAddress)) 
                {
                    LResponse.Error.ErrorCode = Constants.Errors.EmailAlreadyExists.ErrorCode;
                    LResponse.Error.ErrorDesc = Constants.Errors.EmailAlreadyExists.ErrorDesc;
                    FAppLogger.LogWarn(string.Format("GET api/v1/ajax/validation/{0}. {1}.", EmailAddress, LResponse.Error.ErrorDesc));
                    return StatusCode(200, LResponse);
                }

                if (!await FDnsLookup.IsDomainExist(EmailAddress)) 
                {
                    LResponse.Error.ErrorCode = Constants.Errors.EmailDomainNotExist.ErrorCode;
                    LResponse.Error.ErrorDesc = Constants.Errors.EmailDomainNotExist.ErrorDesc;
                    FAppLogger.LogWarn(string.Format("GET api/v1/ajax/validation/{0}. {1}.", EmailAddress, LResponse.Error.ErrorDesc));
                    return StatusCode(200, LResponse);
                }

                LResponse.IsEmailValid = true;
                return StatusCode(200, LResponse);

            } 
            catch (Exception E)
            {
                LResponse.Error.ErrorCode = E.HResult.ToString();
                LResponse.Error.ErrorDesc = E.Message;
                FAppLogger.LogFatality(string.Format("GET api/v1/ajax/validation/{0} | Error has been raised while processing request. Message: {1}.", EmailAddress, E.Message));
                return StatusCode(500, LResponse);
            }

        }

        /// <summary>
        /// Return list of cities for given Country Id.
        /// </summary>
        /// <param name="AId"></param>
        /// <returns></returns>
        public async Task<List<CityList>> ReturnCityList(int AId) 
        {

            var LCities = await FMainDbContext.Cities
                .AsNoTracking()
                .Where(R => R.CountryId == AId)
                .Select(R => new CityList()
                {
                    Id = R.Id,
                    Name = R.CityName
                })
                .ToListAsync();

            return LCities;

        }

        /// <summary>
        /// Endpoint returning list of cities for given Country Id in JSON format.
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        // GET api/v1/ajax/cities/{id}/
        [ValidateAntiForgeryToken]
        [HttpGet("cities/{id}")]
        public async Task<IActionResult> ReturnCityAsync(int Id) 
        {

            var LResponse = new ReturnCityList();
            try 
            {
                LResponse.Cities = await ReturnCityList(Id);
                return StatusCode(200, LResponse);
            } 
            catch (Exception E)
            {
                LResponse.Error.ErrorCode = E.HResult.ToString();
                LResponse.Error.ErrorDesc = E.Message;
                FAppLogger.LogFatality(string.Format("GET api/v1/cities/{0} | Error has been raised while processing request. Message: {1}.", Id, E.Message));
                return StatusCode(500, LResponse);
            }

        }

        /// <summary>
        /// Endpoint adding new user to the database.
        /// </summary>
        /// <param name="PayLoad"></param>
        /// <returns></returns>
        // POST api/v1/ajax/users/
        [ValidateAntiForgeryToken]
        [HttpPost("users")]
        public async Task<IActionResult> CreateAccountAsync([FromBody] UserCreate PayLoad) 
        {

            var LResponse = new UserCreated();
            try
            {

                if (!ModelState.IsValid) 
                {
                    LResponse.Error.ErrorCode = Constants.Errors.InvalidPayLoad.ErrorCode;
                    LResponse.Error.ErrorDesc = Constants.Errors.InvalidPayLoad.ErrorDesc;
                    FAppLogger.LogError(string.Format("POST api/v1/ajax/users/. {0}.", LResponse.Error.ErrorDesc));
                    LResponse.IsUserCreated = false;
                    return StatusCode(200, LResponse);
                }

                if (await IsEmailAddressExist(PayLoad.EmailAddress))
                {
                    LResponse.Error.ErrorCode = Constants.Errors.EmailAlreadyExists.ErrorCode;
                    LResponse.Error.ErrorDesc = Constants.Errors.EmailAlreadyExists.ErrorDesc;
                    FAppLogger.LogWarn(string.Format("POST api/v1/ajax/users/. {0}", LResponse.Error.ErrorDesc));
                    return StatusCode(200, LResponse);
                }

                var NewUser = new Users()
                { 
                    FirstName = PayLoad.FirstName,
                    LastName  = PayLoad.LastName,
                    NickName  = PayLoad.NickName,
                    EmailAddr = PayLoad.EmailAddress,
                    Password  = BCrypt.HashPassword(PayLoad.Password, BCrypt.GenerateSalt(12)),
                    PhoneNum  = null,
                    CountryId = PayLoad.CountryId,
                    CityId    = PayLoad.CityId
                };

                FMainDbContext.Users.Add(NewUser);
                await FMainDbContext.SaveChangesAsync();

                LResponse.UserId = NewUser.Id;
                LResponse.IsUserCreated = true;
                
                FAppLogger.LogInfo(string.Format("POST api/v1/ajax/users/ | New user '{0}' has been successfully registered.", PayLoad.EmailAddress));
                return StatusCode(200, LResponse);

            }
            catch (Exception E)
            {
                LResponse.Error.ErrorCode = E.HResult.ToString();
                LResponse.Error.ErrorDesc = E.Message + " " + E.InnerException.Message;
                FAppLogger.LogFatality(string.Format("POST api/v1/ajax/users/ | Error has been raised while processing request. Message: {0}", LResponse.Error.ErrorDesc));
                return StatusCode(500, LResponse);
            }

        }

    }

}
