"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Patient, Office, Media, UserRole, Prescription, Note, Gender, FinancialClass
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.firebase_setup import initialize_firebase, get_firestore_client, get_storage_bucket

api = Blueprint('api', __name__)
initialize_firebase()
db_firestore = get_firestore_client()
bucket = get_storage_bucket()

# Allow CORS requests to this API
CORS(api)

@api.route('/upload', methods=['POST'])
def handle_upload():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    blob = bucket.blob(file.filename)
    blob.upload_from_file(file)
    blob.make_public()
    doc_ref = db_firestore.collection('files').document()
    doc_ref.set({
        'url': blob.public_url,
        'name': file.filename
    })
    return jsonify({"url": blob.public_url}), 200

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
    access_token = create_access_token({"id": user.id, "office_id": user.office_id})
    return jsonify(access_token=access_token), 200


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

@api.route('/create-profile', methods=['POST'])
@jwt_required()
def handle_create_user():

    user = get_jwt_identity()
    office_id = user["office_id"]

    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid data"}), 400

    try:
        new_user = User(
            name=data.get('name'),
            last_name=data.get('last_name'),
            email=data.get('email'),
            password=data.get('password'),
            role=UserRole(data.get('role')),
            office_id=office_id)

        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.serialize()), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": error}), 500


@api.route('/troncas', methods=['GET'])
def test_route():
    return jsonify({"message": "Route is reachable"}), 200


@api.route('/patients', methods=['GET', 'POST', 'PUT'])
@jwt_required()
def handle_patients():

    user = get_jwt_identity()
    patients = Patient.query.filter_by(office_id=user["office_id"]).all()

    if request.method == 'GET':
        
        return jsonify([patient.serialize() for patient in patients]), 200
    if request.method == 'POST':
        data = request.get_json()
        new_patient = Patient(
            chart=len(patients) + 1,
            name=data.get('name'),
            middle_name=data.get('middle_name'),
            last_name=data.get('last_name'),
            address=data.get('address'),
            phone_number=data.get('phone_number'),
            email=data.get('email'),
            gender=Gender(data.get('gender')),
            dob=data.get('dob'),
            office_id=user["office_id"],
            name_of_insurance=data.get('name_of_insurance'),
            subscriber_id=data.get('subscriber_id'),
            subscription_start_date=data.get('subscription_start_date'),
            subscription_end_date=data.get('subscription_end_date'),
            financial_class_of_insurance=FinancialClass(data.get('financial_class_of_insurance')),
            name_of_pharmacy=data.get('name_of_pharmacy'),
            address_of_pharmacy=data.get('address_of_pharmacy')
        )
        db.session.add(new_patient)
        db.session.commit()
        return new_patient.serialize(), 201

    if request.method == 'PUT':
        data = request.get_json()
        patient_id = data.get('id')

        if not patient_id:
            return jsonify({"error": "Patient ID is required for updating"}), 400

   
        patient = Patient.query.filter_by(id=patient_id, office_id=user["office_id"]).first()

        if not patient:
            return jsonify({"error": "Patient not found"}), 404


        patient.name = data.get('name', patient.name)
        patient.middle_name = data.get('middle_name', patient.middle_name)
        patient.last_name = data.get('last_name', patient.last_name)
        patient.address = data.get('address', patient.address)
        patient.phone_number = data.get('phone_number', patient.phone_number)
        patient.email = data.get('email', patient.email)
        patient.gender = Gender(data.get('gender', patient.gender.value))
        patient.dob = data.get('dob', patient.dob)
        patient.name_of_insurance = data.get('name_of_insurance', patient.name_of_insurance)
        patient.subscriber_id = data.get('subscriber_id', patient.subscriber_id)
        patient.subscription_start_date = data.get('subscription_start_date', patient.subscription_start_date)
        patient.subscription_end_date = data.get('subscription_end_date', patient.subscription_end_date)
        patient.financial_class_of_insurance = FinancialClass(data.get('financial_class_of_insurance', patient.financial_class_of_insurance.value))
        patient.name_of_pharmacy = data.get('name_of_pharmacy', patient.name_of_pharmacy)
        patient.address_of_pharmacy = data.get('address_of_pharmacy', patient.address_of_pharmacy)

        db.session.commit()
        return patient.serialize(), 200

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
        return jsonify({"error": "Media not found"}), 404

    if request.method == 'GET':
        return jsonify(media.serialize()), 200

    if request.method == 'PUT':
        data = request.get_json()
        media.url = data.get('url')
        media.patient_id = data.get('patient_id')
        db.session.commit()
        return jsonify(media.serialize()), 200

    if request.method == 'DELETE':
        db.session.delete(media)
        db.session.commit()
        return {"message": "Media deleted"}, 200



@api.route('/prescriptions', methods=['GET', 'POST'])
@jwt_required()
def handle_prescriptions():
    if request.method == 'GET':
        prescriptions= Prescription.query.all()
        return jsonify([prescription.serialize() for prescription in prescriptions]), 200
    if request.method == 'POST':
        data = request.get_json()
        new_prescription = Prescription(
            name_of_medication=data.get('name_of_medication'),
            quantity=data.get('quantity'),
            quantity_of_refills=data.get('quantity_of_refills'),
            patient_id=data.get('patient_id')
        )

        db.session.add(new_prescription)
        db.session.commit()
        return jsonify(new_prescription.serialize()), 201

@api.route('/prescriptions/<int:prescription_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def handle_prescription(prescription_id):
    prescription = Prescription.query.get(prescription_id)
    if not prescription:
        return jsonify({"error": "Prescription not found"}), 404

    if request.method == 'GET':
        return prescription.serialize(), 200

    if request.method == 'PUT':
        data = request.get_json()
        prescription.name_of_medication = data.get('name_of_medication')
        prescription.quantity = data.get('quantity')
        prescription.quantity_of_refills = data.get('quantity_of_refills')

        db.session.commit()
        return jsonify(prescription.serialize()), 200

    if request.method == 'DELETE':
        db.session.delete(prescription)
        db.session.commit()
        return jsonify({"message": "Prescription deleted"}), 200
    
@api.route('/notes', methods=['GET', 'POST'])
@jwt_required()
def handle_notes():
    if request.method == 'GET':
        notes = Note.query.all()
        return jsonify([note.serialize() for note in notes]), 200
    if request.method == 'POST':
        data = request.get_json()
        new_note = Note(
            title= data.get('title'),
            content= data.get('content'),
            patient_id=data.get('patient_id')
        )
        db.session.add(new_note)
        db.session.commit()
        return jsonify(new_note.serialize()), 201

@api.route('/notes/<int:note_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def handle_note(note_id):
    note = Note.query.get(note_id)
    if not note:
        return jsonify({"error": "Note not found"}), 404

    if request.method == 'GET':
        return jsonify(note.serialize()), 200

    if request.method == 'PUT':
        data = request.get_json()

        note.title = data.get('title')
        note.content = data.get('content')
        note.patient_id = data.get('patient_id')

        db.session.commit()
        return jsonify(note.serialize()), 200

    if request.method == 'DELETE':
        db.session.delete(note)
        db.session.commit()
        return jsonify({"message": "Note deleted"}), 200

#patient = Patient.query.filter_by(office_id=user["office_id"], chart=data.get("chart")).first()
@api.route('/search/<int:chart>', methods=['GET'])
@jwt_required()
def handle_get_patient(chart):
    user = get_jwt_identity()
    patient = Patient.query.filter_by(office_id=user["office_id"], chart=chart).first()
    if not patient:
        return jsonify({"error": "chart not found"}), 404
    return jsonify(patient.serialize()), 200

@api.route('/user/profile', methods=['PUT'])
@jwt_required()
def update_user_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id["id"])
    

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid data"}), 400

    try:
        user.name = data.get('name', user.name)
        user.last_name = data.get('last_name', user.last_name)
        user.email = data.get('email', user.email)
        if data.get('password'):
            user.password = data.get('password')
        user.role = UserRole(data.get('role', user.role))
        user.office_id = data.get("office_id", user.office_id)

        db.session.commit()
        return jsonify(user.serialize()), 200
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": str(error)}), 500

@api.route('/user/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    try:
        
        user = get_jwt_identity()
        user_id = user["id"]

        
        if user_id is None:
            return jsonify({"error": "Invalid user ID"}), 400
        

        user = User.query.get(user_id)
        
        if user:
            return jsonify(user.serialize()), 200
        else:
            return jsonify({"error": "User not found"}), 404
    
    except Exception as error:
        return jsonify({"error": error}), 500