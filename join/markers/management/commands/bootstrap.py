
from django.core.management import call_command
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = '''
    Adicionar exemplos.
     - aplicar migrations
     - carregar marcadores
    '''

    def handle(self, *args, **options):
        try:
            call_command('makemigrations', '--noinput')
            call_command('migrate', '--noinput')
            call_command('loaddata', 'markers.json')

        except Exception as exception:
            raise CommandError(
                'Something went wrong during executing commands: {}'.format(
                    exception
                )
            )
        self.stdout.write(self.style.SUCCESS('Successfully ended commands'))