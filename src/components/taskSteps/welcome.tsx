import {useAppDispatch, useAppSelector} from "../../../libs/redux/hooks";
import {RootState} from "../../../libs/redux/store";
import {CommonButton} from "@components/button";
import {stepForward} from "../../../libs/redux/features/experiment/experimentActions";

function getCurrentTaskIndex(state: RootState) {
    return state.tasks.currentTaskIndex!
}

function getTotalNumberOfTasks(state: RootState) {
    return state.tasks.allTasks.length
}

export default function Welcome() {
    const dispatch = useAppDispatch()
    const currentTaskIndex = useAppSelector(getCurrentTaskIndex)
    const totalNumberOfTasks = useAppSelector(getTotalNumberOfTasks)
    return (
        <div className="flex flex-col justify-center items-center relative m-3.5 gap-3">
            <h1 className="text-2xl font-bold text-center text-black">
                {`You are about to start task ${currentTaskIndex + 1} of ${totalNumberOfTasks}`}
            </h1>
            {/*start button*/}
            <CommonButton
                onClick={() => {
                    dispatch(stepForward())
                }}
            >
                Start
            </CommonButton>
        </div>

    )
}