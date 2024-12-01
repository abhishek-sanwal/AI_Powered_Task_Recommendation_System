
from flask import Blueprint, request, jsonify
from flask_login import login_user, login_required, current_user
from src.extensions import db, bcrypt
from src.models import User, Task
from src.schema import user_schema, users_schema
from marshmallow import ValidationError

# Blueprint for auth views
auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/signup', methods=['POST'])
def signup():

    data = request.get_json()

    # Check if user already exists
    user = User.query.filter_by(email=data['email']).first()

    if user:
        return jsonify({'error': 'Email already in use.'}), 400

    user = User.query.filter_by(username=data['username']).first()
    if user:
        return jsonify({'error': 'Username already in use.'}), 400

    # Create and save user
    new_user = User(
        username=data['username'], email=data['email'], password=data['password'])
    try:
        db.session.add(new_user)
        db.session.commit()
    except ValidationError as e:
        # Handle validation error from Marshmallow
        return jsonify({'error': str(e)}), 400

    return jsonify({'message': 'User created successfully!'}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        # Get data from request
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Validate input
        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400

        # Find user by email
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({'error': 'Invalid email or password.'}), 401

        # Check password
        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({'error': 'Invalid email or password.'}), 401

        return jsonify(
            {'userId': user.id,
                'message': 'Login successful!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Get User route (protected route)


# # @auth_bp.route('/<id>', methods=['GET'])
# # def get_user():
# #     try:
# #         # Get user ID from request arguments
# #         user_id = request.args.get('id')

# #         if not user_id:
# #             return jsonify({'error': 'User ID is required'}), 400

# #         # Query the user by ID
# #         user = User.query.get(user_id)

# #         if not user:
# #             return jsonify({'error': 'User not found'}), 404

# #         # Use user_schema to serialize the user object
# #         user_data = user_schema.dump(user)

# #         return jsonify(user_data), 200

# #     except Exception as e:
#         return jsonify({'error': f'Something went wrong: {str(e)}'}), 500
