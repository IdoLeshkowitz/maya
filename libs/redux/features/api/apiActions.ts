import {createAction} from "@reduxjs/toolkit";
import {TaskResult} from "@/types/taskResult";
import {PersonalDetails} from "@/types/personalDetails";




export const submitCurrentTaskResults = createAction('api/submitCurrentTaskResults')

export const submitPersonalDetails = createAction('api/submitPersonalDetails')