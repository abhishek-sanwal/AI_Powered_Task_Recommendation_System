from src.extensions import db
from datetime import datetime
from flask import request, jsonify, Blueprint
from src.models import Task, User
from src.schema import task_schema, tasks_schema
from src.ai.sentiment import analysis
from src.ai.recommend import recommend
tasks_bp = Blueprint("task", __name__)


@tasks_bp.route('/', methods=['POST'])
def add_task():
    print(request.json)
    title = request.json['title']
    description = request.json.get('description')
    status = request.json['status']
    priority = request.json['priority']
    deadline = datetime.strptime(
        request.json['deadline'], '%Y-%m-%d')
    estimated_time = request.json['estimated_time']
    user_id = request.json['user_id']

    new_task = Task(title=title, description=description, status=status,
                    priority=priority, deadline=deadline, estimated_time=estimated_time, user_id=user_id)
    try:
        db.session.add(new_task)
        db.session.commit()
        return task_schema.jsonify(new_task), 201
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({'message': 'Error creating task'}), 400


@tasks_bp.route('/users-task/<id>', methods=['GET'])
def get_user_tasks(id):
    user = User.query.get_or_404(id)
    tasks = Task.query.filter_by(user_id=user.id).all()
    return tasks_schema.jsonify(tasks)


@tasks_bp.route('/<id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get_or_404(id)

    task.title = request.json.get('title', task.title)
    task.description = request.json.get('description', task.description)
    task.status = request.json.get('status', task.status)
    task.priority = request.json.get('priority', task.priority)
    task.deadline = datetime.strptime(request.json.get(
        'deadline', task.deadline.strftime('%Y-%m-%d')), '%Y-%m-%d')
    task.estimated_time = request.json.get(
        'estimated_time', task.estimated_time)

    try:
        db.session.commit()
        return task_schema.jsonify(task)
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error updating task'}), 400


@tasks_bp.route('/<id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)

    try:
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': 'Task deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error deleting task'}), 400


@tasks_bp.route("/recommend", methods=["GET"])
def recommend_tasks():

    tasks = Task.query.all()

    tasks = recommend(tasks)

    return tasks_schema.jsonify(tasks), 200


@tasks_bp.route("/sentiment/<id>")
def sentiment_task(id):

    task = Task.query.get_or_404(id)
    if not task:
        return jsonify({
            'message': "No task with given id"
        })
    sentiment = analysis(sentiment_task)

    return jsonify({
        "sentimentTask": sentiment
    }), 200
