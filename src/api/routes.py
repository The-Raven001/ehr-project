"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Patient, Office, Media, UserRole
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/signup', methods=['POST'])
def handle_signup():
    data = request.get_json()

    try: 
        new_office = Office(
        name=data.get('name_office'),
        address=data.get('address'),
        )

        db.session.add(new_office)
        db.session.commit()
        db.session.refresh(new_office)

        new_office_id = new_office.id

        first_user = User(
            name=data.get('name'),
            last_name=data.get('last_name'),
            email=data.get('email'),
            password=data.get('password'),
            office_id=new_office_id,
            role=UserRole('admin') 
        )   

        db.session.add(first_user)
        db.session.commit()
        db.session.refresh(first_user)

        return jsonify({
            "message": "Office and first user created successfully"
        }), 200

    except Exception as e:
        # Log the error for further inspection
        print(f"Error in handle_signup: {e}")
        db.session.rollback()
        return jsonify({"error": "An error occurred while creating office or user"}), 500


@api.route('/login', methods=['POST'])
def handle_login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    if not user:
        return {"error": "Invalid email"}, 401
    if user.password != data.get('password'):
        return {"error": "Invalid password"}, 401
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

@api.route('/register', methods=['POST'])
def handle_register():
    data = request.get_json()
    new_user = User(
        name=data.get('name'),
        last_name=data.get('last_name'),
        email=data.get('email'),
        password=data.get('password'),
        office_id=data.get('office_id'),
        role=data.get('role')
    )
    db.session.add(new_user)
    db.session.commit()
    return new_user.serialize(), 201


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def handle_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return {"error": "User not found"}, 404

    if request.method == 'GET':
        return jsonify(user.serialize()), 200

    if request.method == 'PUT':
        data = request.get_json()
        user.name = data.get('name')
        user.last_name = data.get('last_name')
        user.email = data.get('email')
        user.password = data.get('password')
        user.office_id = data.get('office_id')
        user.role = data.get('role')
        db.session.commit()
        return user.serialize(), 200

    if request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted"}, 200

@api.route('/patients', methods=['GET', 'POST'])
@jwt_required()
def handle_patients():
    if request.method == 'GET':
        patients = Patient.query.all()
        return jsonify([patient.serialize() for patient in patients]), 200
    if request.method == 'POST':
        data = request.get_json()
        new_patient = Patient(
            chart=data.get('chart'),
            name=data.get('name'),
            middle_name=data.get('middle_name'),
            last_name=data.get('last_name'),
            address=data.get('address'),
            phone_number=data.get('phone_number'),
            email=data.get('email'),
            gender=data.get('gender'),
            dob=data.get('dob'),
            office_id=data.get('office_id'),
            name_of_insurance=data.get('name_of_insurance'),
            subscriber_id=data.get('subscriber_id'),
            subscription_start_date=data.get('subscription_start_date'),
            subscription_end_date=data.get('subscription_end_date'),
            financial_class_of_insurance=data.get('financial_class_of_insurance'),
            name_of_pharmacy=data.get('name_of_pharmacy'),
            address_of_pharmacy=data.get('address_of_pharmacy'),
            name_of_medication=data.get('name_of_medication'),
            quantity=data.get('quantity'),
            quantity_of_refills=data.get('quantity_of_refills')
        )
        db.session.add(new_patient)
        db.session.commit()
        return new_patient.serialize(), 201

@api.route('/patients/<int:patient_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def handle_patient(patient_id):
    patient = Patient.query.get(patient_id)
    if not patient:
        return {"error": "Patient not found"}, 404

    if request.method == 'GET':
        return patient.serialize(), 200

    if request.method == 'PUT':
        data = request.get_json()
        patient.chart = data.get('chart')
        patient.name = data.get('name')
        patient.middle_name = data.get('middle_name')
        patient.last_name = data.get('last_name')
        patient.address = data.get('address')
        patient.phone_number = data.get('phone_number')
        patient.email = data.get('email')
        patient.gender = data.get('gender')
        patient.dob = data.get('dob')
        patient.office_id = data.get('office_id')
        patient.name_of_insurance = data.get('name_of_insurance')
        patient.subscriber_id = data.get('subscriber_id')
        patient.subscription_start_date = data.get('subscription_start_date')
        patient.subscription_end_date = data.get('subscription_end_date')
        patient.financial_class_of_insurance = data.get('financial_class_of_insurance')
        patient.name_of_pharmacy = data.get('name_of_pharmacy')
        patient.address_of_pharmacy = data.get('address_of_pharmacy')
        patient.name_of_medication = data.get('name_of_medication')
        patient.quantity = data.get('quantity')
        patient.quantity_of_refills = data.get('quantity_of_refills')
        db.session.commit()
        return patient.serialize(), 200

    if request.method == 'DELETE':
        db.session.delete(patient)
        db.session.commit()
        return {"message": "Patient deleted"}, 200

@api.route('/offices', methods=['GET', 'POST'])
@jwt_required()
def handle_offices():
    if request.method == 'GET':
        offices = Office.query.all()
        return jsonify([office.serialize() for office in offices]), 200
    if request.method == 'POST':
        data = request.get_json()
        new_office = Office()
        db.session.add(new_office)
        db.session.commit()
        return new_office.serialize(), 201

@api.route('/offices/<int:office_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def handle_office(office_id):
    office = Office.query.get(office_id)
    if not office:
        return {"error": "Office not found"}, 404

    if request.method == 'GET':
        return office.serialize(), 200

    if request.method == 'PUT':
        data = request.get_json()
        db.session.commit()
        return office.serialize(), 200

    if request.method == 'DELETE':
        db.session.delete(office)
        db.session.commit()
        return {"message": "Office deleted"}, 200

@api.route('/medias', methods=['GET', 'POST'])
@jwt_required()
def handle_medias():
    if request.method == 'GET':
        medias = Media.query.all()
        return jsonify([media.serialize() for media in medias]), 200
    if request.method == 'POST':
        data = request.get_json()
        new_media = Media(
            url=data.get('url'),
            patient_id=data.get('patient_id')
        )
        db.session.add(new_media)
        db.session.commit()
        return new_media.serialize(), 201

@api.route('/medias/<int:media_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def handle_media(media_id):
    media = Media.query.get(media_id)
    if not media:
        return {"error": "Media not found"}, 404

    if request.method == 'GET':
        return media.serialize(), 200

    if request.method == 'PUT':
        data = request.get_json()
        media.url = data.get('url')
        media.patient_id = data.get('patient_id')
        db.session.commit()
        return media.serialize(), 200

    if request.method == 'DELETE':
        db.session.delete(media)
        db.session.commit()
        return {"message": "Media deleted"}, 200