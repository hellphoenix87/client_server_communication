# Generated by Django 4.2 on 2023-04-28 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('index_no', models.IntegerField()),
                ('name', models.CharField(max_length=100)),
                ('grade', models.CharField(max_length=100)),
            ],
        ),
    ]
