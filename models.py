import json
import os

class Student:
    def __init__(self, student_id, name, grade):
        self.student_id = student_id
        self.name = name
        self.grade = grade

    def to_dict(self):
        return {
            'student_id': self.student_id,
            'name': self.name,
            'grade': self.grade
        }
    
class GradeTracker:
    def __init__(self, filename='students.json'):
        self.filename = filename
        self.students = self.load_students()

    def load_students(self):
        if os.path.exists(self.filename):
            with open(self.filename, 'r') as f:
                students_data = json.load(f)
                return {str(s['student_id']): Student(**s) for s in students_data}
        return {}

    def save_students(self):
        with open(self.filename, 'w') as f:
            json.dump([s.to_dict() for s in self.students.values()], f)

    def add_student(self, student):
        self.students[str(student.student_id)] = student
        self.save_students()

    def update_grade(self,student_id, new_grade):
        if str(student_id) in self.students:
            self.students[str(student_id)].grade = new_grade
            self.save_students()
            return True
        return False
    
    def delete_student(self, student_id):
        if str(student_id) in self.students:
            del self.students[str(student_id)]
            self.save_students()
            return True
        return False
    
    def get_all_students(self, student_id):
        return self.students.get(str(student_id))