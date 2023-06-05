namespace AbpMicroservice.DbMigrator.Model;

public class ServiceClient
{
    public string ClientId { get; set; }
    public string ResponseType { get; set; }
    public string ClientSecret { get; set; }
    public List<string> RootUrls { get; set; }
    public List<string> Scopes { get; set; }
    public List<string> GrantTypes { get; set; }
    public List<string> RedirectUris { get; set; }
    public List<string> PostLogoutRedirectUris { get; set; }
    public List<string> AllowedCorsOrigins { get; set; }

    public List<string> Permissions { get; set; }
}