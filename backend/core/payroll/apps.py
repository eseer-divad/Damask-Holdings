# payroll/apps.py
from django.apps import AppConfig

class PayrollConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'payroll'

    def ready(self):
        import payroll.models  # Import signals here
