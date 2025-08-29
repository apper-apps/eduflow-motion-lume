import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import RichTextEditor from '@/components/atoms/RichTextEditor';
import { assignmentService } from '@/services/api/assignmentService';
import { courseService } from '@/services/api/courseService';

const AssignmentCreateModal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    courseId: '',
    type: '',
    dueDate: '',
    points: '',
    instructions: ''
  });

  const assignmentTypes = [
    { value: 'homework', label: 'Homework' },
    { value: 'project', label: 'Project' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'exam', label: 'Exam' },
    { value: 'discussion', label: 'Discussion' },
    { value: 'presentation', label: 'Presentation' }
  ];

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const courseData = await courseService.getAll();
      const courseOptions = courseData.map(course => ({
        value: course.Id.toString(),
        label: course.title
      }));
      setCourses(courseOptions);
    } catch (error) {
      console.error('Failed to load courses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Assignment title is required');
      return;
    }

    if (!formData.content.trim()) {
      toast.error('Assignment content is required');
      return;
    }

    if (!formData.courseId) {
      toast.error('Please select a course');
      return;
    }

    if (!formData.type) {
      toast.error('Please select an assignment type');
      return;
    }

    if (!formData.dueDate) {
      toast.error('Due date is required');
      return;
    }

    try {
      setLoading(true);
      
      const newAssignment = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        courseId: parseInt(formData.courseId),
        type: formData.type,
        dueDate: formData.dueDate,
        points: parseInt(formData.points) || 100,
        instructions: formData.instructions,
        status: 'draft',
        submissionCount: 0,
        createdAt: new Date().toISOString()
      };

      await assignmentService.create(newAssignment);
      toast.success('Assignment created successfully!');
      navigate('/assignments');
    } catch (error) {
      toast.error('Failed to create assignment. Please try again.');
      console.error('Assignment creation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/assignments');
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-surface/90 backdrop-blur-sm border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Create New Assignment</h2>
              <p className="text-gray-400 mt-1">Create an assignment with rich content and instructions</p>
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
              label="Assignment Title"
              placeholder="Enter assignment title"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              required
            />
            
            <Input
              label="Short Description"
              placeholder="Brief description (optional)"
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Select
              label="Course"
              value={formData.courseId}
              onChange={(value) => updateField('courseId', value)}
              options={courses}
              placeholder="Select course"
              required
            />
            
            <Select
              label="Type"
              value={formData.type}
              onChange={(value) => updateField('type', value)}
              options={assignmentTypes}
              placeholder="Select type"
              required
            />
            
            <Input
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => updateField('dueDate', e.target.value)}
              min={getTomorrowDate()}
              required
            />
            
            <Input
              label="Points"
              type="number"
              placeholder="100"
              value={formData.points}
              onChange={(e) => updateField('points', e.target.value)}
              min="1"
              max="1000"
            />
          </div>

          <RichTextEditor
            label="Assignment Content"
            value={formData.content}
            onChange={(value) => updateField('content', value)}
            placeholder="Describe the assignment requirements, objectives, and what students need to complete..."
            height="250px"
            helperText="This is the main content that describes what students need to do."
          />

          <RichTextEditor
            label="Instructions & Guidelines"
            value={formData.instructions}
            onChange={(value) => updateField('instructions', value)}
            placeholder="Provide detailed instructions, submission guidelines, grading criteria, etc..."
            height="200px"
            helperText="Additional instructions, submission format, grading rubric, and any special requirements."
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
              Create Assignment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentCreateModal;