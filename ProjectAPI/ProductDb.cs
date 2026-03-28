using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class ProductAPI : ControllerBase
{
    private static List<Product> products = new List<Product>
    {
        new Product { Id = 1, Name = "Testing Dummy", Price = 70, Inventory = 1 },
        new Product { Id = 2, Name = "Laser Gun", Price = 400, Inventory = 4 }
    };

    [HttpGet]
    public IEnumerable<Product> Get()
    {
        return products;
    }

    [HttpPost]
    public IActionResult Post([FromBody] Product newProduct)
    {
        if (newProduct == null)
            return BadRequest("Product data is missing or malformed");

        newProduct.Id = products.Count > 0 ? products.Max(p => p.Id) + 1 : 1;
        products.Add(newProduct);

        return Created("", newProduct);
    }
}