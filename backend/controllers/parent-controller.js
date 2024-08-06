

const bcrypt = require('bcrypt');
const Parent = require('../models/parentSchema.js');
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');

// Parent Registration
const parentRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const existingParent = await Parent.findOne({ email: req.body.email });

        if (existingParent) {
            res.send({ message: 'Email already exists' });
        } else {
            const parent = new Parent({
                ...req.body,
                password: hashedPass
            });

            let result = await parent.save();
            result.password = undefined;
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Parent Login
const parentLogIn = async (req, res) => {
    try {
        let parent = await Parent.findOne({ email: req.body.email });
        if (parent) {
            const validated = await bcrypt.compare(req.body.password, parent.password);
            if (validated) {
                parent.password = undefined;
                res.send(parent);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Parent not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get Parents
const getParents = async (req, res) => {
    try {
        let parents = await Parent.find();
        if (parents.length > 0) {
            let modifiedParents = parents.map((parent) => {
                return { ...parent._doc, password: undefined };
            });
            res.send(modifiedParents);
        } else {
            res.send({ message: "No parents found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get Parent Detail
const getParentDetail = async (req, res) => {
    try {
        let parent = await Parent.findById(req.params.id).populate('children', 'name rollNum sclassName');
        if (parent) {
            parent.password = undefined;
            res.send(parent);
        } else {
            res.send({ message: "No parent found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete Parent
const deleteParent = async (req, res) => {
    try {
        const result = await Parent.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).json(err);
    }
};

// Update Parent
const updateParent = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        
        let result = await Parent.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        result.password = undefined;
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Add Child to Parent
const addChildToParent = async (req, res) => {
    try {
        const parent = await Parent.findById(req.params.parentId);
        const student = await Student.findById(req.params.studentId);

        if (!parent || !student) {
            return res.send({ message: "Parent or Student not found" });
        }

        parent.children.push(student._id);
        await parent.save();

        student.parents.push(parent._id);
        await student.save();

        res.send({ message: "Child added to parent successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
};

// Remove Child from Parent
const removeChildFromParent = async (req, res) => {
    try {
        const parent = await Parent.findById(req.params.parentId);
        const student = await Student.findById(req.params.studentId);

        if (!parent || !student) {
            return res.send({ message: "Parent or Student not found" });
        }

        parent.children.pull(student._id);
        await parent.save();

        student.parents.pull(parent._id);
        await student.save();

        res.send({ message: "Child removed from parent successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get Children for Parent
const getChildrenForParent = async (req, res) => {
    try {
        const parent = await Parent.findById(req.params.id).populate('children', 'name rollNum sclassName examResult attendance');
        if (!parent) {
            return res.send({ message: "Parent not found" });
        }

        res.send(parent.children);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    parentRegister,
    parentLogIn,
    getParents,
    getParentDetail,
    deleteParent,
    updateParent,
    addChildToParent,
    removeChildFromParent,
    getChildrenForParent,
};