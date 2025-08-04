import jwt
import os
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3

class AuthManager:
    def __init__(self):
        self.secret_key = os.getenv('JWT_SECRET_KEY', 'fallback-secret-key')
    
    def generate_token(self, user_id, username):
        """Generate JWT token for authenticated user"""
        payload = {
            'user_id': user_id,
            'username': username,
            'exp': datetime.utcnow() + timedelta(hours=24),  # Token expires in 24 hours
            'iat': datetime.utcnow()
        }
        token = jwt.encode(payload, self.secret_key, algorithm='HS256')
        return token
    
    def verify_token(self, token):
        """Verify JWT token and return user data"""
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            return {'error': 'Token has expired'}
        except jwt.InvalidTokenError:
            return {'error': 'Invalid token'}
    
    def hash_password(self, password):
        """Hash password for storage"""
        return generate_password_hash(password)
    
    def check_password(self, hashed_password, password):
        """Check if password matches hash"""
        return check_password_hash(hashed_password, password)

# Authentication decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')
        
        if auth_header:
            try:
                token = auth_header.split(' ')[1]  # Bearer <token>
            except IndexError:
                return jsonify({'error': 'Invalid token format'}), 401
        
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        auth_manager = AuthManager()
        result = auth_manager.verify_token(token)
        
        if 'error' in result:
            return jsonify({'error': result['error']}), 401
        
        # Add user data to request context
        request.current_user = result
        return f(*args, **kwargs)
    
    return decorated

def init_auth_db():
    """Initialize users table"""
    from models import get_db_connection
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT 1
    )
    ''')
    
    # Create default admin user if no users exist
    cursor.execute('SELECT COUNT(*) FROM users')
    user_count = cursor.fetchone()[0]
    
    if user_count == 0:
        auth_manager = AuthManager()
        admin_password_hash = auth_manager.hash_password('admin123')
        cursor.execute('''
        INSERT INTO users (username, email, password_hash)
        VALUES (?, ?, ?)
        ''', ('admin', 'admin@iotwatch.com', admin_password_hash))
        print("Created default admin user: admin / admin123")
    
    conn.commit()
    conn.close()
    print("Authentication database initialized")

def get_user_by_username(username):
    """Get user by username or email from database"""
    from models import get_db_connection
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Try to find user by username first, then by email
    cursor.execute('''
    SELECT id, username, email, password_hash, is_active
    FROM users WHERE (username = ? OR email = ?) AND is_active = 1
    ''', (username, username))
    
    user = cursor.fetchone()
    conn.close()
    
    if user:
        return {
            'id': user[0],
            'username': user[1],
            'email': user[2],
            'password_hash': user[3],
            'is_active': user[4]
        }
    return None

def create_user(username, email, password):
    """Create new user"""
    from models import get_db_connection
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    auth_manager = AuthManager()
    password_hash = auth_manager.hash_password(password)
    
    try:
        cursor.execute('''
        INSERT INTO users (username, email, password_hash)
        VALUES (?, ?, ?)
        ''', (username, email, password_hash))
        
        user_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return {'id': user_id, 'username': username, 'email': email}
    except sqlite3.IntegrityError as e:
        conn.close()
        if 'username' in str(e):
            return {'error': 'Username already exists'}
        elif 'email' in str(e):
            return {'error': 'Email already exists'}
        else:
            return {'error': 'User creation failed'}
