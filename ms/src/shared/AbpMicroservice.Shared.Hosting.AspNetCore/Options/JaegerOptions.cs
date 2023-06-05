namespace AbpMicroservice.Shared.Hosting.AspNetCore.Options;

public class JaegerOptions
{
    public const string Jaeger = "Jaeger";
    public bool Enabled { get; set; }
    public string Host { get; set; }
    public int Port { get; set; }
}