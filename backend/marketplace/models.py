from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=100)
    slug = models.CharField(unique=True, max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'categories'
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/', blank=True, null=True)  # Заменили CharField на ImageField
    slug = models.CharField(max_length=100, unique=True, blank=True)  # Добавили slug
    is_favorite = models.BooleanField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Product.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    class Meta:
        managed = False
        db_table = 'products'
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=50)
    password = models.CharField(max_length=100)
    email = models.CharField(unique=True, max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.username

    class Meta:
        managed = False
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

class Cart(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"Cart #{self.id} - {self.user.username if self.user else 'Anonymous'}"

    class Meta:
        managed = False
        db_table = 'carts'
        verbose_name = 'Cart'
        verbose_name_plural = 'Carts'

class CartItem(models.Model):
    id = models.AutoField(primary_key=True)
    cart = models.ForeignKey(Cart, models.CASCADE, blank=True, null=True)
    product = models.ForeignKey(Product, models.CASCADE, blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.quantity} x {self.product.name if self.product else 'Unknown Product'}"

    class Meta:
        managed = False
        db_table = 'cart_items'
        verbose_name = 'Cart Item'
        verbose_name_plural = 'Cart Items'