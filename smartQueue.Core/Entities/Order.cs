namespace smartQueue.Core.Entities;
public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public bool IsFinished { get; set; }
    public List<OrderItem> OrderItems { get; set; }
}