import {useAppDispatch, useAppSelector} from "../../../libs/redux/hooks";
import {RootState} from "../../../libs/redux/store";
import {CommonButton} from "@components/button";
import {stepForward} from "../../../libs/redux/features/experiment/experimentActions";
import CommonLayout from "@components/commonLayout";

function getCurrentTaskIndex(state: RootState) {
    return state.tasks.currentTaskIndex!
}

function getTotalNumberOfTasks(state: RootState) {
    return state.tasks.tasksStates.length
}

export default function Welcome() {
    /*
        story
        This is the first screen that the user sees when he starts a new task.
        on the first task it should say -->The experiment is divided to several tasks.Click to start the first task.
        on the other tasks it should say --> You will now start the next part of the task, which is unrelated to the previous part.
     */
    const dispatch = useAppDispatch()
    const currentTaskIndex = useAppSelector(getCurrentTaskIndex)
    const totalNumberOfTasks = useAppSelector(getTotalNumberOfTasks)
    return (
        <CommonLayout
            footer={
                <div className="flex justify-center items-center">
                    <CommonButton onClick={() => {
                        dispatch(stepForward())
                    }}
                    >
                        Start
                    </CommonButton>
                </div>
            }
        >
            <p className="text-base text-black text-start px-20">
                {
                    currentTaskIndex === 0 ?
                        `The experiment is divided to several tasks. Click to start the first task.`
                        :
                        `You will now start the next part of the task, which is unrelated to the previous part.`
                }
            </p>
        </CommonLayout>
    )
}