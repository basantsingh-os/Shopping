using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggrregate;
using Core.Interface;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
      
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBasketRepository _basketRepo;

        public OrderService(IUnitOfWork unitOfWork,
        IBasketRepository basketRepo
        )
        {
            _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;
        }
        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            //get basket from basket repo 
            var basket= await _basketRepo.GetBasketAsync(basketId);
            
            //never trust price of products in basket do check in database
            //get items from product repo 
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
               var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
               var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name,
               productItem.PictureUrl);
               var orderItem = new OrderItem(itemOrdered , productItem.Price , item.Quantity);
               items.Add(orderItem);
            }
            //get delivery method from repo //
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
            //calc subtotal
            var subtotal = items.Sum(item => item.Price*item.Quantity);
            //create order
            var order = new Order(items,buyerEmail,shippingAddress,deliveryMethod,subtotal);
            //save to db
            _unitOfWork.Repository<Order>().Add(order);
            var result = await _unitOfWork.Complete();
            if(result <=0) return null;
            // delete basket
            await _basketRepo.DeleteBasketAsync(basketId);
            //return order
            return order;
        }



        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);
            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

        }

        public async Task<IReadOnlyList<Order>> GetOrderForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);
            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }
    }
}