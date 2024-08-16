from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already in use.")


def ssn_exists(form, field):
    ssn = field.data
    user = User.query.filter(User.ssn == ssn).first()
    if user:
        raise ValidationError("SSN is already in use")


class SignUpForm(FlaskForm):
    username = StringField("username", validators=[DataRequired(), username_exists])
    email = StringField("email", validators=[DataRequired(), user_exists])
    password = StringField("password", validators=[DataRequired()])
    first_name = StringField("first_name", validators=[DataRequired(), Length(1, 20)])
    last_name = StringField("last_name", validators=[DataRequired(), Length(1, 20)])
    address = StringField("address", validators=[DataRequired(), Length(1, 50)])
    city = StringField("city", validators=[DataRequired(), Length(1, 30)])
    state = StringField("state", validators=[DataRequired(), Length(1, 2)])
    zip = IntegerField("zip", validators=[DataRequired(), NumberRange(10000, 99999)])
    phone = IntegerField(
        "phone", validators=[DataRequired(), NumberRange(1000000000, 9999999999)]
    )
    ssn = IntegerField(
        "ssn",
        validators=[DataRequired(), NumberRange(100000000, 999999999), ssn_exists],
    )
    birthday = DateField("birthday", validators=[DataRequired()])
    citizenship = StringField("citizenship", validators=[DataRequired(), Length(1, 20)])
