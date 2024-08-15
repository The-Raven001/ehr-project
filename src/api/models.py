from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Enum as SqlEnum, Date
from sqlalchemy.orm import relationship, declarative_base
from enum import Enum as PyEnum

db = SQLAlchemy()

class UserRole(PyEnum):
    ADMIN = 'admin'
    USER = 'user'

class Gender(PyEnum):
    MALE = 'male'
    FEMALE = 'female'
    UNSPECIFIED = "unspecified"

class FinancialClass(PyEnum):
    HMO = 'hmo'
    PPO = 'ppo'
    MEDICARE = 'mc'
    MEDICAL = 'ml'
    MEDICAREMEDICAL = 'mm'
    SELFPAYED = 'sp'

class Office(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return f'<Office: {self.id}>'

    def serialize(self):
        return{
            "id": self.id
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(180), unique=False, nullable=False)
    office_id = db.Column(db.Integer, db.ForeignKey('office.id'))
    office = db.relationship(Office)
    role = db.Column(SqlEnum(UserRole), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "office": self.office_id
        }

class Patient(db.Model):

#Patient info
    id = db.Column(db.Integer, primary_key=True)
    chart = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    middle_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    gender = db.Column(SqlEnum(Gender), nullable=False)
    dob = db.Column(db.String(10), nullable=False)
    office_id = db.Column(db.Integer, db.ForeignKey('office.id'))
    office = db.relationship(Office)

#Insurance
    name_of_insurance = db.Column(db.String(100))
    subscriber_id = db.Column(db.String(50))
    subscription_start_date = db.Column(Date, nullable=False)
    subscription_end_date = db.Column(Date)
    financial_class_of_insurance = db.Column(SqlEnum(FinancialClass), nullable=False)

#Pharmacy
    
    name_of_pharmacy = db.Column(db.String(50))
    address_of_pharmacy = db.Column(db.String(100))

#Prescriptions

    name_of_medication = db.Column(db.String(100))
    quantity = db.Column(db.Integer)
    quantity_of_refills = db.Column(db.Integer)


    def serialize(self):
        return {
            "id": self.id,
            "chart": self.chart,
            "office_id": self.office_id,
            "name": self.name,
            "middle_name": self.middle_name,
            "last_name": self.last_name,
            "address": self.address,
            "phone_number": self.phone_number,
            "email": self.email,
            "gender": self.gender,
            "dob": self.dob,
            "name_of_insurance": self.name_of_insurance,
            "subscriber_id": self.subscriber_id,
            "subscription_start_date": self.subscription_start_date,
            "subscription_end_date": self.subscription_end_date,
            "name_of_pharmacy": self.name_of_pharmacy,
            "address_of_pharmacy": self.address_of_pharmacy,
        }

    def __repr__(self):
        return f'<Patient {self.id}>'


class Media(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(300))
    patient_id = db.Column(db.Integer, db.ForeignKey("patient.id"))
    patient = db.relationship(Patient)

    def serialize(self):
        return{
            "id": self.id,
            "url": self.url,
            "patient id": self.patient_id
        }

    def __repr__(self):
        return{
            f"<Media {self.id}>"
        }