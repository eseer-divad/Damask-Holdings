import uuid
from datetime import timezone
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

# db models
class Login(models.Model):
    userid = models.CharField(db_column='userID', primary_key=True, max_length=64, db_collation='SQL_Latin1_General_CP1_CI_AS')
    password = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    username = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')

    class Meta:
        managed = False
        db_table = 'Login'
        app_label = 'payroll'


class PtoRequests(models.Model):
    requestid = models.CharField(db_column='RequestID', primary_key=True, max_length=64, db_collation='SQL_Latin1_General_CP1_CI_AS')
    employeeid = models.CharField(db_column='employeeID', max_length=64, db_collation='SQL_Latin1_General_CP1_CI_AS')
    rdate = models.DateField(db_column='rDate')
    approval = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'PTO_requests'
        app_label = 'payroll'


class Employeeinfo(models.Model):
    employeeid = models.CharField(db_column='EmployeeID', primary_key=True, max_length=64, db_collation='SQL_Latin1_General_CP1_CI_AS')
    userid = models.CharField(db_column='UserID', max_length=64, db_collation='SQL_Latin1_General_CP1_CI_AS')
    salary = models.BooleanField(db_column='Salary')
    prorate = models.BooleanField(db_column='Prorate')
    exempt = models.BooleanField(db_column='Exempt')
    wage = models.DecimalField(db_column='Wage', max_digits=19, decimal_places=4)
    overtimediff = models.FloatField(db_column='OvertimeDiff')
    pto = models.FloatField(db_column='PTO')

    class Meta:
        managed = False
        db_table = 'employeeInfo'
        app_label = 'payroll'


class Timeclock(models.Model):
    punchid = models.CharField(db_column='punchID', primary_key=True, max_length=64, db_collation='SQL_Latin1_General_CP1_CI_AS')
    employeeid = models.CharField(db_column='employeeID', max_length=64, db_collation='SQL_Latin1_General_CP1_CI_AS')
    timepunch = models.DateTimeField(db_column='timePunch')

    class Meta:
        managed = False
        db_table = 'timeClock'
        app_label = 'payroll'


class Userinfo(models.Model):
    userid = models.CharField(db_column='userID', primary_key=True, max_length=64, db_collation='SQL_Latin1_General_CP1_CI_AS')
    firstname = models.CharField(db_column='firstName', max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    middlename = models.CharField(db_column='middleName', max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    lastname = models.CharField(db_column='lastName', max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    ssn = models.CharField(db_column='SSN', max_length=9, unique=True, db_collation='SQL_Latin1_General_CP1_CI_AS')
    dob = models.DateField(db_column='DOB')
    routingnum = models.CharField(db_column='routingNum', max_length=9, db_collation='SQL_Latin1_General_CP1_CI_AS')
    accountnum = models.CharField(db_column='accountNum', max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    streetaddress = models.CharField(db_column='streetAddress', max_length=30, db_collation='SQL_Latin1_General_CP1_CI_AS')
    state = models.CharField(db_column='State', max_length=2, db_collation='SQL_Latin1_General_CP1_CI_AS')
    zipcode = models.CharField(max_length=5, db_collation='SQL_Latin1_General_CP1_CI_AS')
    isadmin = models.BooleanField(db_column='isAdmin')

    # required attrs for returning information w/ token
    # Django decides the requrements for this.
    REQUIRED_FIELDS = ['isadmin']
    USERNAME_FIELD = 'ssn'  # unique identifier
    @property
    def is_anonymous(self):
        return False

    @property
    def is_authenticated(self):
        return True

    # meta
    class Meta:
        managed = False
        db_table = 'userInfo'
        app_label = 'payroll'


# ----
#  when you create a LoginToken for a user, it's associated with their Userinfo record,
#  allowing you to access and display user data throughout the frontend.

# Custom token model
class LoginToken(models.Model):
    key = models.CharField(max_length=40, primary_key=True)
    user = models.OneToOneField(
        Userinfo,
        on_delete=models.CASCADE,
        db_column='user_id',
    )
    additional_info = models.CharField(max_length=255, blank=True, null=True)
    expiration_date = models.DateTimeField()

    def __str__(self):
        return self.key
    
    class Meta:
        managed = False
        db_table = 'LoginToken'

# Signal to create a token after account creation
@receiver(post_save, sender=Userinfo)
def create_login_token(sender, instance=None, created=False, **kwargs):
    if created:
        unique_key = str(uuid.uuid4())
        expiration_time = timezone.now() + timezone.timedelta(days=3)
        LoginToken.objects.create(
            key=unique_key,
            user=instance,
            additional_info=str(timezone.now()),  # Change this line to store creation time
            expiration_date=expiration_time
        )
