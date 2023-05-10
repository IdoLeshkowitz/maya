import {createAction} from "@reduxjs/toolkit";
import {progressSlice} from "./progressSlice";

export const {setCurrentTaskIndex, setCurrentTaskStatus, setExperimentStatus} = progressSlice.actions