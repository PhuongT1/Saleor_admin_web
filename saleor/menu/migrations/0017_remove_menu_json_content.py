# Generated by Django 3.0.6 on 2020-06-10 10:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("menu", "0016_auto_20200217_0350"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="menu",
            name="json_content",
        ),
    ]