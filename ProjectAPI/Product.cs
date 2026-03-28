using System.Text.Json.Serialization;

public class Product
{
    public int Id { get; set; }

    [JsonPropertyName("Name")]
    public string? Name { get; set; }

    [JsonPropertyName("Price")]
    public int Price { get; set; }

    [JsonPropertyName("Inventory")]
    public int Inventory { get; set; }
}