﻿using Microsoft.EntityFrameworkCore;
using RazorWebApp.Infrastructure.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RazorWebApp.Infrastructure.Database.Mappings
{
    public class SigninHistoryConfiguration : IEntityTypeConfiguration<SigninHistory>
    {
        public void Configure(EntityTypeBuilder<SigninHistory> AEntityBuilder)
        {
            AEntityBuilder
                .Property(ASigninHistory => ASigninHistory.LoggedAt)
                .HasColumnType("datetime");

            AEntityBuilder
                .HasOne(ASigninHistory => ASigninHistory.User)
                .WithMany(AUsers => AUsers.SigninHistory)
                .HasForeignKey(ASigninHistory => ASigninHistory.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserId__Users");
        }
    }
}
