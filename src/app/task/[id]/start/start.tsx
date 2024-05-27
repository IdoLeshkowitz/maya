import {CommonButtonLink} from "@components/button";
import CommonLayout from "@components/commonLayout";

export async function generateStaticParams() {
    return [
        {isFirst: true},
        {isFirst: false}
    ]
}

interface TaskStartProps {
    isFirst: boolean
    taskId: string
}

export default function Start(props: TaskStartProps) {
    return (
        <CommonLayout
            footer={
                <div className="flex justify-center items-center">
                    <CommonButtonLink
                        href={`/task/${props.taskId}/instructions`}
                    >
                        Start
                    </CommonButtonLink>
                </div>
            }
        >
            <p className="text-base text-black text-start px-20">
                {
                    props.isFirst ?
                        `The experiment is divided to several tasks. Click to start the first task.`
                        :
                        `You will now start the next part of the task, which contains different stock portfolios.`
                }
            </p>
        </CommonLayout>
    )
}