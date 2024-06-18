namespace smartQueue.Core.Entities;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Cpf { get; set; }
    public DateTime BirthDate { get; set; }
}