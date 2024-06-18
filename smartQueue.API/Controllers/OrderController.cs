using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using smartQueue.Core.Entities;
using smartQueue.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace SmartQueue.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                .ToListAsync();
        }

        // GET: api/order/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // POST: api/order
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        // PUT: api/order/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, Order updatedOrder)
        {
            if (id != updatedOrder.Id)
            {
                return BadRequest();
            }

            var existingOrder = await _context.Orders
                .Include(o => o.OrderItems) // Eagerly load OrderItems
                .FirstOrDefaultAsync(o => o.Id == id);

            if (existingOrder == null)
            {
                return NotFound();
            }

            // Update the existingOrder's properties with values from updatedOrder
            _context.Entry(existingOrder).CurrentValues.SetValues(updatedOrder);

            // Handle potential changes to OrderItems (if applicable)
            foreach (var updatedItem in updatedOrder.OrderItems)
            {
                var existingItem = existingOrder.OrderItems
                    .FirstOrDefault(oi => oi.Id == updatedItem.Id);
        
                if (existingItem != null)
                {
                    _context.Entry(existingItem).CurrentValues.SetValues(updatedItem);
                }
                else
                {
                    existingOrder.OrderItems.Add(updatedItem);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                var entry = ex.Entries.Single();
                var clientValues = (Order)entry.Entity;
                var databaseEntry = entry.GetDatabaseValues();

                if (databaseEntry == null)
                {
                    ModelState.AddModelError(string.Empty,
                        "The record you attempted to edit "
                        + "was deleted by another user after you got the original values. "
                        + "Edit operation was canceled and the current values in the database "
                        + "have been displayed. If you still want to edit this record, click "
                        + "the Save button again. Otherwise click the Back to List hyperlink.");
                    return StatusCode(409, existingOrder); // Conflict
                }

                // Handle concurrency conflicts here... 
            }

            return Ok(existingOrder);
        }

        // DELETE: api/order/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
