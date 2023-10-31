from django.db import models


class Test_(models.Model):
    text = models.TextField(max_length=255)
