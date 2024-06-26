# Generated by Django 5.0.4 on 2024-06-19 07:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0002_manga'),
    ]

    operations = [
        migrations.CreateModel(
            name='Manganuevo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('imagen', models.ImageField(blank=True, null=True, upload_to='mangas/')),
            ],
        ),
    ]
