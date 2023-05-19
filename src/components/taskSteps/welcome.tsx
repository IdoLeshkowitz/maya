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
    const dispatch = useAppDispatch()
    const currentTaskIndex = useAppSelector(getCurrentTaskIndex)
    const totalNumberOfTasks = useAppSelector(getTotalNumberOfTasks)
    const currentTaskString = () => {
        if (currentTaskIndex === 0) {
            return "first "
        }
        if (currentTaskIndex === 1) {
            return "second "
        }
        if (currentTaskIndex === 2) {
            return "third "
        }
    }
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
            <p className="text-base text-black text-center">
                {`You are about to start ${currentTaskString()} task`}
            </p>
        </CommonLayout>
    )
}