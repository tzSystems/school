const router = require('express').Router();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Student = require('../models/studentSchema.js');
const Admin = require('../models/adminSchema.js');

app.use(bodyParser.json());

// Controllers
const { adminRegister, adminLogIn, getAdminDetail } = require('../controllers/admin-controller.js');
const { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents } = require('../controllers/class-controller.js');
const { complainCreate, complainList } = require('../controllers/complain-controller.js');
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.js');
const { studentRegister, studentLogIn, getStudents, getStudentDetail, deleteStudents, deleteStudent, updateStudent, studentAttendance, deleteStudentsByClass, updateExamResult, clearAllStudentsAttendanceBySubject, clearAllStudentsAttendance, removeStudentAttendanceBySubject, removeStudentAttendance } = require('../controllers/student-controller.js');
const { subjectCreate, classSubjects, deleteSubjectsByClass, getSubjectDetail, deleteSubject, freeSubjectList, allSubjects, deleteSubjects } = require('../controllers/subject-controller.js');
const { teacherRegister, teacherLogIn, getTeachers, getTeacherDetail, deleteTeachers, deleteTeachersByClass, deleteTeacher, updateTeacherSubject, teacherAttendance } = require('../controllers/teacher-controller.js');
const { parentRegister, getChild, parentLogIn, getParents, getParentDetail, getChildrenForParent } = require('../controllers/parent-controller.js'); // Import parent controller functions
const { sendMessage, getMessagesBySenderAndRecipient, deleteMessage, getMessagesByUserId } = require('../controllers/message-controller.js'); // Import message controller functions

// Controllers for chat list operations
const { 
    createChatList,
    getChatListsForUser,
    updateLastMessage,
    markMessagesAsRead,
    deleteChatList
} = require('../controllers/chatlist-controller.js');

// Fetch chat lists for a user
router.get('/chatlists/:userId/:role', getChatListsForUser);

// Create a new chat list
router.post('/chatlists', createChatList);

// Update the last message in a chat list
router.put('/chatlists/:chatListId', updateLastMessage);

// Mark messages as read in a chat list
router.put('/chatlists/:chatListId/read', markMessagesAsRead);

// Admin Routes
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);
router.get('/Admin/:id', getAdminDetail);
// router.delete('/Admin/:id', deleteAdmin);  // Future Route
// router.put('/Admin/:id', updateAdmin);     // Future Route

// Student Routes
router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn);
router.get('/Students/:id', getStudents);
router.get('/Student/:id', getStudentDetail);
router.delete('/Students/:id', deleteStudents);
router.delete('/StudentsClass/:id', deleteStudentsByClass);
router.delete('/Student/:id', deleteStudent);
router.put('/Student/:id', updateStudent);
router.put('/UpdateExamResult/:id', updateExamResult);
router.put('/StudentAttendance/:id', studentAttendance);
router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);
router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance);

const fetchStudentNames = async (req, res) => {
    const { name, schoolName } = req.body;
    console.log(`Received request for name: ${name} and schoolName: ${schoolName}`);

    try {
        const school = await Admin.findOne({ schoolName }).select('-password'); 
        if (!school) {
            return res.status(404).json({
                message: 'School not found'
            });
        }

        const students = await Student.find({
            name: { $regex: `^${name}`, $options: 'i' },
            school: school._id
        })
        .select('-password')
        .populate({
            path: 'sclassName',
            select: '-password' 
        })
        .populate({
            path: 'school',
            select: '-password'
        })
        .populate({
            path: 'examResult.subName',
            select: '-password'
        })
        .populate({
            path: 'attendance.subName',
            select: '-password'
        });

        res.status(200).json({
            message: 'Students fetched successfully',
            students
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while fetching students',
            error: error.message
        });
    }
};

router.post('/Students', fetchStudentNames);

// Teacher Routes
router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn);
router.get('/Teachers/:id', getTeachers);
router.get('/Teacher/:id', getTeacherDetail);
router.delete('/Teachers/:id', deleteTeachers);
router.delete('/TeachersClass/:id', deleteTeachersByClass);
router.delete('/Teacher/:id', deleteTeacher);
router.put('/TeacherSubject', updateTeacherSubject);
router.post('/TeacherAttendance/:id', teacherAttendance);
// router.put('/TeacherQuiz', updateTeacherQuiz);      // Future Route
// router.post('/TeacherMaterial', addTeacherMaterial);  // Future Route

// Notice Routes
router.post('/NoticeCreate', noticeCreate);
router.get('/NoticeList/:id', noticeList);
router.delete('/Notices/:id', deleteNotices);
router.delete('/Notice/:id', deleteNotice);
router.put('/Notice/:id', updateNotice);

// Complain Routes
router.post('/ComplainCreate', complainCreate);
router.get('/ComplainList/:id', complainList);

// Sclass Routes
router.post('/SclassCreate', sclassCreate);
router.get('/SclassList/:id', sclassList);
router.get('/Sclass/:id', getSclassDetail);
router.get('/Sclass/Students/:id', getSclassStudents);
router.delete('/Sclasses/:id', deleteSclasses);
router.delete('/Sclass/:id', deleteSclass);

// Subject Routes
router.post('/SubjectCreate', subjectCreate);
router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get('/Subject/:id', getSubjectDetail);
router.delete('/Subject/:id', deleteSubject);
router.delete('/Subjects/:id', deleteSubjects);
router.delete('/SubjectsClass/:id', deleteSubjectsByClass);

// Parent Routes
router.post('/ParentReg', parentRegister);
router.post('/ParentLogin', parentLogIn);
router.get('/Parents', getParents);
router.get('/Parent/:id', getParentDetail);
router.get('/Parent/Student/:id', getChild);

// Route to send a message
router.post('/send', sendMessage);

// Route to get all messages between a specific sender and recipient
router.get('/Messages/:senderId/:recipientId', getMessagesBySenderAndRecipient);

// Route to get all messages associated with a specific user ID (sender or recipient)
router.get('/user/:userId', getMessagesByUserId);

// Route to delete a message
router.delete('/delete/:messageId', deleteMessage);

module.exports = router;
