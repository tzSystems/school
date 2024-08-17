import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';
import { parentReducer } from './parentRelated/parentSlice';
import { studentSearchReducer } from './studentRelated/studentSearchSlice';
import { langReducer } from './langRelated/langSlice';
import { messageReducer } from './messageRelated/messageSlice';
import { chatListReducer } from './chatlistRelated/chatlistSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        studentSearch: studentSearchReducer,
        sclass: sclassReducer,
        parent: parentReducer,
        language: langReducer,
        messages: messageReducer,
        chatList: chatListReducer,
    },
});

export default store;
