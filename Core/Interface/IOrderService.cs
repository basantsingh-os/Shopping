using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.OrderAggrregate;

namespace Core.Interface
{
    public interface IOrderService
    {
         Task<Order> CreateOrderAsync(string buyeremail,int deliveryMethod
         ,string basketId,Address shippingAddress);

         Task<IReadOnlyList<Order>> GetOrderForUserAsync(string buyerEmail);

         Task<Order> GetOrderByIdAsync(int id,string buyerEmail);
         Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodAsync();
    }
}