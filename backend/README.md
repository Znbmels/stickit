# Hockey Marketplace Backend

This is the backend for the Hockey Marketplace application, built with Django and Django REST Framework.

## Setup

1. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py migrate
```

4. Create a superuser for admin access:
```bash
python manage.py createsuperuser
```

5. Run the development server:
```bash
python manage.py runserver
```

## API Endpoints

- Products: `/api/products/`
- Categories: `/api/categories/`
- Orders: `/api/orders/`
- User Profiles: `/api/profiles/`

## Admin Interface

Access the admin interface at `/admin/` using your superuser credentials.

## Features

- Product management
- Category management
- Order processing
- User profiles
- RESTful API
- Admin interface
- Image upload support
- CORS enabled for frontend integration 