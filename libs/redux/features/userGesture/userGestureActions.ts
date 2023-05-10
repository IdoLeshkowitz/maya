import {createAction} from "@reduxjs/toolkit";

export const startExperiment = createAction('userGesture/startExperiment');
export const finishExperiment = createAction('userGesture/finishExperiment');

export const startInstructions = createAction('userGesture/startInstructions');
export const finishInstructions = createAction('userGesture/finishInstructions');

export const startNextTask = createAction('userGesture/startNextTask');
export const finishTask = createAction('userGesture/finishTask');


export const startLeftPreview = createAction('userGesture/startLeftPreview');
export const finishLeftPreview = createAction('userGesture/finishLeftPreview');
export const startRightPreview = createAction('userGesture/startRightPreview');
export const finishRightPreview = createAction('userGesture/finishRightPreview');

export const startOptionSelection = createAction('userGesture/startOptionSelection');
export const finishOptionSelection = createAction('userGesture/finishOptionSelection');


export const startGroupScoring = createAction('userGesture/startScores');
export const finishGroupScoring = createAction('userGesture/finishScores');
