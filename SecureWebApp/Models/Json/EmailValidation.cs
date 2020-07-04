using System.Text.Json.Serialization;

namespace SecureWebApp.Models.Json
{
    
    public class EmailValidation
    {

        [JsonPropertyName("IsEmailValid")]
        public bool IsEmailValid { get; set; }

        [JsonPropertyName("Error")]
        public ErrorHandler Error { get; set; }

        public EmailValidation()
        {
            Error = new ErrorHandler();
        }

    }

}