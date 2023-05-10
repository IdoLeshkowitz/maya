import {useAppDispatch} from "../../libs/redux/hooks";
import {finishInstructions} from "../../libs/redux/features/userGesture/userGestureActions";

export default function Instructions() {
    const dispatch = useAppDispatch()

    return (
        <div className="flex flex-col items-center justify-center text-black">
            <h1 className="text-4xl font-bold text-center">Instructions</h1>
            <p className="text-xl text-center">This is a test of the instructions page</p>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                    dispatch(finishInstructions())
                }}
            >
                skip
            </button>
        </div>
    )
}

