using System;
using Core.Entities.OrderAggrregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.OwnsOne(o => o.ShipToAddress , a =>
            {
                a.WithOwner();
            }
            );
            builder.Property(s => s.Status)
            .HasConversion(
                o => o.ToString(),
                o => (OrderStatus) Enum.Parse(typeof(OrderStatus),o)
            );
            builder.HasMany(o => o.OrderItem).WithOne().OnDelete(DeleteBehavior.Cascade);
            //delete an order then delete all items related to order
        }
    }
}