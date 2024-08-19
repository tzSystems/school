import { configureStore } from '@reduxjs/toolkit';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

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
    middleware: (getDefaultMiddleware) => {
        const middlewares = getDefaultMiddleware();

        if (process.env.NODE_ENV !== 'production') {
            middlewares.push(
                reduxImmutableStateInvariant({
                    ignore: ['some.large.state'], // Replace with actual state paths to ignore if needed
                })
            );
        }

        return middlewares;
    },
});

export default store;
