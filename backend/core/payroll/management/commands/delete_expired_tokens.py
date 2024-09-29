# your_app/management/commands/delete_expired_tokens.py

from django.core.management.base import BaseCommand
from django.utils import timezone
from your_app.models import LoginToken

class Command(BaseCommand):
    help = 'Delete expired login tokens'

    def handle(self, *args, **options):
        expired_tokens = LoginToken.objects.filter(expiration_date__lt=timezone.now())
        expired_tokens.delete()
        self.stdout.write(self.style.SUCCESS('Successfully deleted expired tokens'))
