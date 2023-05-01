from django.db import models

# Create your models here.

class Student(models.Model):
    index_no = models.IntegerField()
    name = models.CharField(max_length=100)
    grade = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name