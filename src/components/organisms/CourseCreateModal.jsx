import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import RichTextEditor from '@/components/atoms/RichTextEditor';
import { courseService } from '@/services/api/courseService';

const CourseCreateModal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    duration: '',
    instructor: ''
  });

  const categories = [
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'other', label: 'Other' }
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Course title is required');
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Course description is required');
      return;
    }

    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }

    if (!formData.difficulty) {
      toast.error('Please select a difficulty level');
      return;
    }

    try {
      setLoading(true);
      
      const newCourse = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        difficulty: formData.difficulty,
        duration: formData.duration || '8 weeks',
        instructor: formData.instructor || 'TBD',
        status: 'draft',
        enrolledStudents: 0,
        maxStudents: 30,
        progress: 0,
        createdAt: new Date().toISOString()
      };

      await courseService.create(newCourse);
      toast.success('Course created successfully!');
      navigate('/courses');
    } catch (error) {
      toast.error('Failed to create course. Please try again.');
      console.error('Course creation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/courses');
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-surface/90 backdrop-blur-sm border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Create New Course</h2>
              <p className="text-gray-400 mt-1">Add a new course with rich content description</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-gray-400 hover:text-white"
            >
              <ApperIcon name="X" size={20} />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Course Title"
              placeholder="Enter course title"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              required
            />
            
            <Input
              label="Instructor"
              placeholder="Instructor name (optional)"
              value={formData.instructor}
              onChange={(e) => updateField('instructor', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Select
              label="Category"
              value={formData.category}
              onChange={(value) => updateField('category', value)}
              options={categories}
              placeholder="Select category"
              required
            />
            
            <Select
              label="Difficulty"
              value={formData.difficulty}
              onChange={(value) => updateField('difficulty', value)}
              options={difficulties}
              placeholder="Select difficulty"
              required
            />
            
            <Input
              label="Duration"
              placeholder="e.g., 8 weeks"
              value={formData.duration}
              onChange={(e) => updateField('duration', e.target.value)}
            />
          </div>

          <RichTextEditor
            label="Course Description"
            value={formData.description}
            onChange={(value) => updateField('description', value)}
            placeholder="Describe what students will learn in this course..."
            height="300px"
            helperText="Use the toolbar to format your course description with headings, lists, and styling."
          />

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              icon="Plus"
            >
              Create Course
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseCreateModal;