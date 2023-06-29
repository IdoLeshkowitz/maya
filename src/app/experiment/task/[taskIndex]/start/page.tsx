import CommonLayout from "@components/commonLayout";
import {CommonLink} from "@components/button";
import {prisma} from "@client";
import {cookies} from "next/headers";

export default function StartTaskPage({params}: { params: { taskIndex: string } }) {
    prisma.app.update({
        where: {
            appName_experimentSessionId: {
                appName            : "task",
                experimentSessionId: cookies().get("experimentSessionId")?.value!
            }
        },
        data : {
            children: {
                update: {
                    where: {
                        appName_experimentSessionId: {
                            appName            : params.taskIndex,
                            experimentSessionId: cookies().get("experimentSessionId")?.value!
                        }
                    },
                    data : {
                        activeChild: "start"
                    }
                }
            },
        }
    }).catch(e => console.error(e))
    return (
        <CommonLayout
            footer={
                <div className="flex justify-center items-center">
                    <CommonLink href="instructions/0">
                        Start
                    </CommonLink>
                </div>
            }
        >
            <p className="text-base text-black text-start px-20">
                {
                    params.taskIndex === "0" ?
                        `The experiment is divided to several tasks. Click to start the first task.`
                        :
                        `You will now start the next part of the task, which is unrelated to the previous part.`
                }
            </p>
        </CommonLayout>
    )
}